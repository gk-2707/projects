package com.example.myapplication.screens

import android.content.Context
import android.os.Environment
import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.myapplication.R
import com.itextpdf.io.image.ImageDataFactory
import com.itextpdf.kernel.colors.ColorConstants
import com.itextpdf.kernel.pdf.PdfDocument
import com.itextpdf.kernel.pdf.PdfWriter
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine
import com.itextpdf.layout.Document
import com.itextpdf.layout.borders.SolidBorder
import com.itextpdf.layout.element.Cell
import com.itextpdf.layout.element.Image
import com.itextpdf.layout.element.LineSeparator
import com.itextpdf.layout.element.Paragraph
import com.itextpdf.layout.element.Table
import com.itextpdf.layout.properties.TextAlignment
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*

data class Product(
    var name: String,
    var quantity: String,
    var price: String,
    var gst: String = "No GST"
)

// ---------- Helper Functions ----------
private fun parseIntSafe(s: String): Int = s.trim().toIntOrNull() ?: 0
private fun parseDoubleSafe(s: String): Double = s.trim().toDoubleOrNull() ?: 0.0
private fun parseGstPercent(s: String): Double = s.removeSuffix("%").trim().toDoubleOrNull() ?: 0.0

// ---------- GST Dropdown for Each Product ----------
@Composable
private fun GSTDropdownPerItem(
    selected: String,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val options = listOf("No GST", "5%", "12%", "18%", "28%")
    var expanded by remember { mutableStateOf(false) }

    Box(modifier) {
        OutlinedTextField(
            value = selected,
            onValueChange = {},
            label = { Text("GST") },
            readOnly = true,
            trailingIcon = {
                IconButton(onClick = { expanded = true }) {
                    Icon(Icons.Filled.ArrowDropDown, contentDescription = "Open")
                }
            },
            modifier = Modifier.fillMaxWidth()
        )
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach { opt ->
                DropdownMenuItem(
                    text = { Text(opt) },
                    onClick = {
                        onSelect(opt)
                        expanded = false
                    }
                )
            }
        }
    }
}

// ---------- Invoice Screen ----------
@Composable
fun InvoiceScreen(navController: NavController) {
    val context = LocalContext.current
    val scrollState = rememberScrollState()
    val scope = rememberCoroutineScope()
    var isGenerating by remember { mutableStateOf(false) }

    // Company details
    val sharedPreferences = context.getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)
    val companyName = sharedPreferences.getString("companyName", "My Company") ?: "My Company"
    val companyAddress = sharedPreferences.getString("companyAddress", "Address") ?: "Address"
    val companyPhone = sharedPreferences.getString("companyPhone", "1234567890") ?: "1234567890"
    val companyEmail = sharedPreferences.getString("companyEmail", "company@example.com") ?: "company@example.com"

    // Invoice & Customer
    var invoiceNumber by remember { mutableStateOf(TextFieldValue("#INV 1")) }
    var customerName by remember { mutableStateOf(TextFieldValue("")) }
    var customerAddress by remember { mutableStateOf(TextFieldValue("")) }
    var customerPhone by remember { mutableStateOf(TextFieldValue("")) }
    var customerEmail by remember { mutableStateOf(TextFieldValue("")) }
    var shippingAddress by remember { mutableStateOf(TextFieldValue("")) }

    // Bank
    var bankName by remember { mutableStateOf(TextFieldValue("")) }
    var accountNumber by remember { mutableStateOf(TextFieldValue("")) }
    var ifscCode by remember { mutableStateOf(TextFieldValue("")) }

    // Products
    val products = remember { mutableStateListOf(Product("", "", "")) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(scrollState)
    ) {
        Text("Invoice Details", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))

        OutlinedTextField(
            value = invoiceNumber,
            onValueChange = { invoiceNumber = it },
            label = { Text("Invoice Number") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(16.dp))

        // Customer + Shipping
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Column(Modifier.weight(1f)) {
                Text("Customer Details", style = MaterialTheme.typography.titleMedium)
                OutlinedTextField(
                    value = customerName, onValueChange = { customerName = it },
                    label = { Text("Name") }, modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = customerAddress, onValueChange = { customerAddress = it },
                    label = { Text("Address") }, modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = customerPhone, onValueChange = { customerPhone = it },
                    label = { Text("Phone") }, modifier = Modifier.fillMaxWidth()
                )
                OutlinedTextField(
                    value = customerEmail, onValueChange = { customerEmail = it },
                    label = { Text("Email") }, modifier = Modifier.fillMaxWidth()
                )
            }
            Column(Modifier.weight(1f)) {
                Text("Shipping Address", style = MaterialTheme.typography.titleMedium)
                OutlinedTextField(
                    value = shippingAddress, onValueChange = { shippingAddress = it },
                    label = { Text("Address") }, modifier = Modifier.fillMaxWidth()
                )
            }
        }

        Spacer(Modifier.height(16.dp))

        // Products
        Text("Products", style = MaterialTheme.typography.headlineSmall)
        Spacer(Modifier.height(8.dp))

        products.forEachIndexed { index, product ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = product.name,
                    onValueChange = { products[index] = product.copy(name = it) },
                    label = { Text("Name") },
                    modifier = Modifier.weight(1.2f)
                )
                OutlinedTextField(
                    value = product.quantity,
                    onValueChange = { products[index] = product.copy(quantity = it) },
                    label = { Text("Qty") },
                    modifier = Modifier.weight(0.6f)
                )
                OutlinedTextField(
                    value = product.price,
                    onValueChange = { products[index] = product.copy(price = it) },
                    label = { Text("Price") },
                    modifier = Modifier.weight(0.8f)
                )
                GSTDropdownPerItem(
                    selected = product.gst,
                    onSelect = { gst -> products[index] = product.copy(gst = gst) },
                    modifier = Modifier.weight(0.9f)
                )
                Button(
                    onClick = { if (products.size > 1) products.removeAt(index) },
                    modifier = Modifier.weight(0.5f)
                ) {
                    Text("X")
                }
            }
            Spacer(Modifier.height(8.dp))
        }

        Button(onClick = { products.add(Product("", "", "")) }, modifier = Modifier.fillMaxWidth()) {
            Text("Add Product")
        }

        Spacer(Modifier.height(16.dp))

        // Bank box
        Text("Bank Details", style = MaterialTheme.typography.headlineSmall)
        OutlinedTextField(
            value = bankName, onValueChange = { bankName = it },
            label = { Text("Bank Name") }, modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = accountNumber, onValueChange = { accountNumber = it },
            label = { Text("Account Number") }, modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = ifscCode, onValueChange = { ifscCode = it },
            label = { Text("IFSC Code") }, modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(16.dp))

        Button(
            enabled = !isGenerating,
            onClick = {
                if (customerName.text.isBlank() || products.isEmpty() || products.any { it.name.isBlank() }) {
                    Toast.makeText(context, "Enter valid details", Toast.LENGTH_SHORT).show()
                    return@Button
                }
                scope.launch {
                    isGenerating = true
                    val ok = withContext(Dispatchers.IO) {
                        generateInvoicePdf(
                            context,
                            invoiceNumber.text,
                            companyName,
                            companyAddress,
                            companyPhone,
                            companyEmail,
                            customerName.text,
                            customerAddress.text,
                            customerPhone.text,
                            customerEmail.text,
                            shippingAddress.text,
                            products.toList(),
                            bankName.text,
                            accountNumber.text,
                            ifscCode.text
                        )
                    }
                    isGenerating = false
                    Toast.makeText(
                        context,
                        if (ok) "Invoice downloaded!" else "Error generating invoice!",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isGenerating) "Generating..." else "Download Invoice")
        }

        Spacer(Modifier.height(48.dp))
    }
}

// ---------- PDF Generation ----------
fun generateInvoicePdf(
    context: Context,
    invoiceNumber: String,
    companyName: String,
    companyAddress: String,
    companyPhone: String,
    companyEmail: String,
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    customerEmail: String,
    shippingAddress: String,
    products: List<Product>,
    bankName: String,
    accountNumber: String,
    ifscCode: String
): Boolean {
    return try {
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val fileName = "Invoice_$timestamp.pdf"
        val downloads = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
        if (!downloads.exists()) downloads.mkdirs()
        val file = File(downloads, fileName)

        val writer = PdfWriter(FileOutputStream(file))
        val pdf = PdfDocument(writer)
        val doc = Document(pdf)

        // ===== Header =====
        doc.add(
            Paragraph(companyName)
                .setBold()
                .setFontSize(16f)
                .setTextAlignment(TextAlignment.CENTER)
        )
        doc.add(
            Paragraph("$companyAddress\nPhone: $companyPhone | Email: $companyEmail")
                .setTextAlignment(TextAlignment.CENTER)
        )

        val lineSeparator = LineSeparator(SolidLine(1f))
        doc.add(lineSeparator)

        val dateStr = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(Date())
        doc.add(Paragraph("Invoice No: $invoiceNumber    Date: $dateStr").setMarginTop(4f))
        doc.add(Paragraph("\n"))

        // ===== Customer + Shipping table =====
        val detailsTable = Table(floatArrayOf(1f, 1f)).useAllAvailableWidth()
        val custCell = Cell().add(
            Paragraph(
                "Customer Details\n\n" +
                        "Name: $customerName\n" +
                        "Address: $customerAddress\n" +
                        "Phone: $customerPhone\n" +
                        "Email: $customerEmail"
            ).setMargin(6f)
        ).setBorder(SolidBorder(1f))
        val shipCell = Cell().add(
            Paragraph("Shipping Address\n\n$shippingAddress").setMargin(6f)
        ).setBorder(SolidBorder(1f))
        detailsTable.addCell(custCell)
        detailsTable.addCell(shipCell)
        doc.add(detailsTable)

        doc.add(Paragraph("\n"))

        // ===== Products table =====
        val columnWidths = floatArrayOf(0.7f, 3.2f, 1.0f, 1.2f, 0.9f, 1.4f, 1.4f, 1.6f)
        val table = Table(columnWidths).useAllAvailableWidth()
        fun headerCell(text: String): Cell = Cell().add(Paragraph(text).setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY)

        table.addCell(headerCell("#"))
        table.addCell(headerCell("Item"))
        table.addCell(headerCell("Qty"))
        table.addCell(headerCell("Price"))
        table.addCell(headerCell("GST%"))
        table.addCell(headerCell("Amount"))
        table.addCell(headerCell("GST Amt"))
        table.addCell(headerCell("Line Total"))

        var subTotal = 0.0
        var totalGst = 0.0

        products.forEachIndexed { idx, p ->
            val qty = parseIntSafe(p.quantity).coerceAtLeast(0)
            val price = parseDoubleSafe(p.price).coerceAtLeast(0.0)
            val amount = qty * price
            val gstPct = parseGstPercent(p.gst)
            val gstAmt = amount * gstPct / 100.0
            val lineTotal = amount + gstAmt

            subTotal += amount
            totalGst += gstAmt

            table.addCell(Cell().add(Paragraph("${idx + 1}")))
            table.addCell(Cell().add(Paragraph(p.name.ifBlank { "-" })))
            table.addCell(Cell().add(Paragraph(qty.toString())).setTextAlignment(TextAlignment.RIGHT))
            table.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "%.2f", price))).setTextAlignment(TextAlignment.RIGHT))
            table.addCell(Cell().add(Paragraph(if (gstPct == 0.0) "-" else "${gstPct.toInt()}%")).setTextAlignment(TextAlignment.RIGHT))
            table.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "%.2f", amount))).setTextAlignment(TextAlignment.RIGHT))
            table.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "%.2f", gstAmt))).setTextAlignment(TextAlignment.RIGHT))
            table.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "%.2f", lineTotal))).setTextAlignment(TextAlignment.RIGHT))
        }

        doc.add(table)
        doc.add(Paragraph("\n"))

        // ===== Totals =====
        val grandTotal = subTotal + totalGst
        val totalsTable = Table(floatArrayOf(3f, 1.5f)).useAllAvailableWidth()
        totalsTable.addCell(Cell().add(Paragraph("Subtotal")).setBorder(SolidBorder(1f)))
        totalsTable.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "₹ %.2f", subTotal))).setTextAlignment(TextAlignment.RIGHT).setBorder(SolidBorder(1f)))
        totalsTable.addCell(Cell().add(Paragraph("GST Total")).setBorder(SolidBorder(1f)))
        totalsTable.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "₹ %.2f", totalGst))).setTextAlignment(TextAlignment.RIGHT).setBorder(SolidBorder(1f)))
        totalsTable.addCell(Cell().add(Paragraph("Grand Total").setBold()).setBorder(SolidBorder(1f)))
        totalsTable.addCell(Cell().add(Paragraph(String.format(Locale.getDefault(), "₹ %.2f", grandTotal)).setBold()).setTextAlignment(TextAlignment.RIGHT).setBorder(SolidBorder(1f)))
        doc.add(totalsTable)
        doc.add(Paragraph("\n"))

        // ===== Bank details =====
        val bankTable = Table(floatArrayOf(1f)).useAllAvailableWidth()
        bankTable.addCell(Cell().add(
            Paragraph(
                "Bank Details\n\n" +
                        "Bank: ${bankName.ifBlank { "-" }}\n" +
                        "Account No: ${accountNumber.ifBlank { "-" }}\n" +
                        "IFSC: ${ifscCode.ifBlank { "-" }}"
            ).setMargin(6f)
        ).setBorder(SolidBorder(1f)))
        doc.add(bankTable)

        doc.add(Paragraph("\nThank you for your business!").setTextAlignment(TextAlignment.CENTER))

        // ===== Signature section from drawable =====
        try {
            val signatureStream = context.resources.openRawResource(R.drawable.signature)
            val imgData = ImageDataFactory.create(signatureStream.readBytes())
            val signatureImage = Image(imgData).scaleToFit(120f, 60f)
            doc.add(Paragraph("\nAuthorized Signature:").setMarginTop(12f))
            doc.add(signatureImage)
        } catch (e: Exception) {
            doc.add(Paragraph("\nAuthorized Signature not found").setMarginTop(12f))
        }

        doc.close()
        true
    } catch (e: Exception) {
        e.printStackTrace()
        false
    }
}

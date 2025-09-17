package com.example.myapplication.screens

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun CompanySetupScreen(navController: NavController) {
    val context: Context = LocalContext.current
    val sharedPreferences = context.getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)

    // Load saved company details
    var companyName by remember { mutableStateOf(sharedPreferences.getString("companyName", "") ?: "") }
    var companyAddress by remember { mutableStateOf(sharedPreferences.getString("companyAddress", "") ?: "") }
    var companyPhone by remember { mutableStateOf(sharedPreferences.getString("companyPhone", "") ?: "") }
    var companyEmail by remember { mutableStateOf(sharedPreferences.getString("companyEmail", "") ?: "") }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("Company Setup", style = MaterialTheme.typography.headlineMedium)

        // Company Name
        OutlinedTextField(
            value = companyName,
            onValueChange = { companyName = it },
            label = { Text("Company Name") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Company Address
        OutlinedTextField(
            value = companyAddress,
            onValueChange = { companyAddress = it },
            label = { Text("Company Address") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Company Phone
        OutlinedTextField(
            value = companyPhone,
            onValueChange = { companyPhone = it },
            label = { Text("Company Phone") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Company Email
        OutlinedTextField(
            value = companyEmail,
            onValueChange = { companyEmail = it },
            label = { Text("Company Email") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Save & Continue Button
        Button(
            onClick = {
                if (companyName.isNotBlank() && companyAddress.isNotBlank() &&
                    companyPhone.isNotBlank() && companyEmail.isNotBlank()
                ) {
                    saveCompanyDetails(context, companyName, companyAddress, companyPhone, companyEmail)
                    Toast.makeText(context, "Company details saved!", Toast.LENGTH_SHORT).show()
                    navController.navigate("home") {
                        popUpTo("companySetup") { inclusive = true }
                    }
                } else {
                    Toast.makeText(context, "Please fill all fields", Toast.LENGTH_SHORT).show()
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Save and Continue")
        }
    }
}

// Function to save company details in SharedPreferences
private fun saveCompanyDetails(context: Context, name: String, address: String, phone: String, email: String) {
    val sharedPreferences = context.getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)
    with(sharedPreferences.edit()) {
        putString("companyName", name)
        putString("companyAddress", address)
        putString("companyPhone", phone)
        putString("companyEmail", email)
        apply()
    }
}

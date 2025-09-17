package com.example.myapplication.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun QuotationScreen(navController: NavController) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Create Quotation", modifier = Modifier.padding(bottom = 16.dp))

        Button(onClick = { navController.navigate("home") }) {
            Text("Back to Home")
        }
    }
}

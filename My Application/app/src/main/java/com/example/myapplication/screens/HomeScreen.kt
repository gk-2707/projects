package com.example.myapplication.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun HomeScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Button(
            onClick = { navController.navigate("invoice") },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Create Invoice")
        }
        Spacer(modifier = Modifier.height(16.dp)) // Increased spacing for better UI
        Button(
            onClick = { navController.navigate("quotation") },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Create Quotation")
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = { navController.navigate("profile") },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Profile")
        }
    }
}

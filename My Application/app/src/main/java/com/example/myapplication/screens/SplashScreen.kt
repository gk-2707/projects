package com.example.myapplication.screens

import android.content.Context
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import kotlinx.coroutines.delay
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.compose.material3.Text

@Composable
fun SplashScreen(navController: NavController) {
    val context = LocalContext.current
    var isCompanySetup by remember { mutableStateOf<Boolean?>(null) }

    LaunchedEffect(Unit) {
        delay(1500) // Simulating splash delay

        // Move shared preferences access to background thread
        val setupStatus = withContext(Dispatchers.IO) {
            val sharedPreferences = context.getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)
            sharedPreferences.getString("companyName", null) != null
        }

        isCompanySetup = setupStatus
    }

    // Navigate when data is loaded
    isCompanySetup?.let { setup ->
        navController.navigate(if (setup) "home" else "companySetup") {
            popUpTo("splash") { inclusive = true }
        }
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "My Bills",
            style = TextStyle(
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold
            )
        )
    }
}

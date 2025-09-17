package com.example.myapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.myapplication.screens.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val navController = rememberNavController()

            Surface(color = MaterialTheme.colorScheme.background) {
                NavHost(
                    navController = navController,
                    startDestination = "splash"
                ) {
                    // Splash Screen
                    composable("splash") {
                        SplashScreen(navController)
                    }

                    // Home Screen
                    composable("home") {
                        HomeScreen(navController)
                    }

                    // Company Setup Screen
                    composable("companySetup") {
                        CompanySetupScreen(navController)
                    }

                    // Invoice Screen
                    composable("invoice") {
                        InvoiceScreen(navController)
                    }

                    // Quotation Screen (NEWLY ADDED)
                    composable("quotation") {
                        QuotationScreen(navController)
                    }

                    // Profile Screen
                    composable("profile") {
                        ProfileScreen(navController)
                    }
                }
            }
        }
    }
}

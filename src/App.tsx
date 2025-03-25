import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<ProgressProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/category/:categoryId" element={<CategoryPage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</ProgressProvider>
		</ThemeProvider>
	</QueryClientProvider>
);

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Check, X, Sun, Moon } from "lucide-react";
import BubbleCloud from "../components/BubbleCloud";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";

const Index = () => {
	const { categories, addCategory, updateCategory, removeCategory } =
		useProgress();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [isEditMode, setIsEditMode] = useState(false);
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [editingCategory, setEditingCategory] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const [editingCategoryName, setEditingCategoryName] = useState("");

	const handleBubbleClick = (categoryId: string) => {
		if (!isEditMode) {
			const category = categories.find((c) => c.id === categoryId);
			if (category) {
				navigate(`/category/${categoryId}`);
			}
		}
	};

	const handleAddCategory = (e: React.FormEvent) => {
		e.preventDefault();
		if (newCategoryName.trim()) {
			addCategory(newCategoryName.trim());
			setNewCategoryName("");
			setIsAddingCategory(false);
		}
	};

	const handleStartEditCategory = (categoryId: string, currentName: string) => {
		setEditingCategory({ id: categoryId, name: currentName });
		setEditingCategoryName(currentName);
	};

	const handleUpdateCategory = (categoryId: string) => {
		if (editingCategoryName.trim()) {
			updateCategory(categoryId, editingCategoryName.trim());
			setEditingCategory(null);
			setEditingCategoryName("");
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<header className="py-8 px-6 text-center">
				<div className="flex items-center justify-between max-w-6xl mx-auto mb-4">
					<button
						onClick={toggleTheme}
						className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
						title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
					>
						{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
					</button>
					<h1 className="text-3xl md:text-4xl font-bold">Progress Bubbles</h1>
					<button
						onClick={() => setIsEditMode(!isEditMode)}
						className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
							isEditMode
								? "bg-primary text-primary-foreground hover:bg-primary/90"
								: "bg-secondary hover:bg-secondary/80"
						}`}
						title={isEditMode ? "Done" : "Edit Categories"}
					>
						<Edit2 size={20} />
					</button>
				</div>
			</header>

			<main className="flex-1 w-full relative">
				{isEditMode && (
					<div className="mb-6">
						{!isAddingCategory ? (
							<button
								onClick={() => setIsAddingCategory(true)}
								className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
							>
								<Plus size={16} />
								<span>Add Category</span>
							</button>
						) : (
							<form
								onSubmit={handleAddCategory}
								className="flex items-center gap-2"
							>
								<input
									type="text"
									value={newCategoryName}
									onChange={(e) => setNewCategoryName(e.target.value)}
									placeholder="New category name"
									className="flex-1 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary"
									autoFocus
								/>
								<button
									type="submit"
									className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
								>
									<Plus size={16} />
								</button>
								<button
									type="button"
									onClick={() => {
										setIsAddingCategory(false);
										setNewCategoryName("");
									}}
									className="bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors"
								>
									<X size={16} />
								</button>
							</form>
						)}
					</div>
				)}

				<BubbleCloud
					items={categories.map((category) => ({
						id: category.id,
						name: category.name,
						progress: category.progress,
						actions: isEditMode ? (
							<div className="flex items-center gap-1">
								{editingCategory?.id === category.id ? (
									<form
										onSubmit={(e) => {
											e.preventDefault();
											handleUpdateCategory(category.id);
										}}
										className="flex items-center gap-1 bg-background/95 backdrop-blur-sm rounded-lg p-1 shadow-lg"
									>
										<input
											type="text"
											value={editingCategoryName}
											onChange={(e) => setEditingCategoryName(e.target.value)}
											className="bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary"
											autoFocus
										/>
										<button
											type="submit"
											className="bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90 transition-colors"
										>
											<Check size={14} />
										</button>
										<button
											type="button"
											onClick={() => {
												setEditingCategory(null);
												setEditingCategoryName("");
											}}
											className="bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
										>
											<X size={14} />
										</button>
									</form>
								) : (
									<>
										<button
											onClick={() =>
												handleStartEditCategory(category.id, category.name)
											}
											className="bg-background/95 backdrop-blur-sm p-1 hover:bg-secondary/50 rounded-full transition-colors shadow-lg"
										>
											<Edit2 size={14} />
										</button>
										<button
											onClick={() => removeCategory(category.id)}
											className="bg-background/95 backdrop-blur-sm p-1 hover:bg-destructive/20 rounded-full transition-colors text-destructive shadow-lg"
										>
											<Trash2 size={14} />
										</button>
									</>
								)}
							</div>
						) : undefined,
					}))}
					onBubbleClick={handleBubbleClick}
				/>
			</main>

			<footer className="py-6 text-center text-sm text-muted-foreground">
				<p>
					{isEditMode
						? "Edit categories or click Done to exit edit mode"
						: "Click on bubbles to explore categories"}
				</p>
			</footer>
		</div>
	);
};

export default Index;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import BubbleCloud from "../components/BubbleCloud";
import CheckboxList from "../components/CheckboxList";
import ProgressBar from "../components/ProgressBar";
import { useProgress } from "../context/ProgressContext";

const CategoryPage = () => {
	const { categoryId } = useParams<{ categoryId: string }>();
	const navigate = useNavigate();
	const {
		categories,
		toggleSubtask,
		calculateTaskProgress,
		addTask,
		removeTask,
		addSubtask,
		removeSubtask,
		updateSubtask,
		updateTask,
	} = useProgress();
	const [selectedTask, setSelectedTask] = useState<string | null>(null);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [newTaskName, setNewTaskName] = useState("");
	const [isAddingSubtask, setIsAddingSubtask] = useState(false);
	const [newSubtaskName, setNewSubtaskName] = useState("");
	const [editingSubtask, setEditingSubtask] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const [editingSubtaskName, setEditingSubtaskName] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);
	const [editingTask, setEditingTask] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const [editingTaskName, setEditingTaskName] = useState("");

	// Find the category
	const category = categories.find((c) => c.id === categoryId);

	if (!category) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center">
				<p>Category not found</p>
				<button
					className="mt-4 flex items-center text-primary hover:underline"
					onClick={() => navigate("/")}
				>
					<ArrowLeft size={16} className="mr-1" /> Return Home
				</button>
			</div>
		);
	}

	const handleBubbleClick = (taskId: string) => {
		setSelectedTask(taskId);
	};

	const handleToggleSubtask = (subtaskId: string) => {
		if (selectedTask) {
			toggleSubtask(category.id, selectedTask, subtaskId);
		}
	};

	const handleAddTask = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTaskName.trim()) {
			addTask(category.id, newTaskName.trim());
			setNewTaskName("");
			setIsAddingTask(false);
		}
	};

	const handleRemoveTask = (taskId: string) => {
		if (selectedTask === taskId) {
			setSelectedTask(null);
		}
		removeTask(category.id, taskId);
	};

	const handleAddSubtask = (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedTask && newSubtaskName.trim()) {
			addSubtask(category.id, selectedTask, newSubtaskName.trim());
			setNewSubtaskName("");
			setIsAddingSubtask(false);
		}
	};

	const handleRemoveSubtask = (subtaskId: string) => {
		if (selectedTask) {
			removeSubtask(category.id, selectedTask, subtaskId);
		}
	};

	const handleStartEditSubtask = (subtaskId: string, currentName: string) => {
		setEditingSubtask({ id: subtaskId, name: currentName });
		setEditingSubtaskName(currentName);
	};

	const handleUpdateSubtask = (subtaskId: string) => {
		if (selectedTask && editingSubtaskName.trim()) {
			updateSubtask(
				category.id,
				selectedTask,
				subtaskId,
				editingSubtaskName.trim()
			);
			setEditingSubtask(null);
			setEditingSubtaskName("");
		}
	};

	const handleStartEditTask = (taskId: string, currentName: string) => {
		setEditingTask({ id: taskId, name: currentName });
		setEditingTaskName(currentName);
	};

	const handleUpdateTask = (taskId: string) => {
		if (editingTaskName.trim()) {
			updateTask(category.id, taskId, editingTaskName.trim());
			setEditingTask(null);
			setEditingTaskName("");
		}
	};

	const selectedTaskData = selectedTask
		? category.tasks.find((t) => t.id === selectedTask)
		: null;

	return (
		<div className="min-h-screen flex flex-col">
			<header className="py-6 px-6 flex items-center">
				<button
					className="flex items-center hover:text-primary transition-colors"
					onClick={() => navigate("/")}
				>
					<ArrowLeft size={20} className="mr-1" />
					<span>Back</span>
				</button>
				<div className="flex-1 text-center">
					<h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
				</div>
				<div className="w-[80px]"></div> {/* Spacer to center title */}
			</header>

			<div className="px-6 py-4 max-w-xl mx-auto w-full">
				<div className="glass-panel p-4 mb-6">
					<h2 className="text-lg font-medium mb-2">Overall Progress</h2>
					<ProgressBar value={category.progress} height={8} />
				</div>
			</div>

			<main className="flex-1 w-full relative">
				<div
					className={`transition-opacity duration-500 ${
						selectedTask ? "opacity-0 pointer-events-none" : "opacity-100"
					}`}
				>
					<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
						<button
							onClick={() => setIsEditMode(!isEditMode)}
							className={`bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors ${
								isEditMode ? "text-primary" : ""
							}`}
							title={isEditMode ? "Done" : "Edit Tasks"}
						>
							<Edit2 size={20} />
						</button>
						{!isAddingTask ? (
							<button
								onClick={() => setIsAddingTask(true)}
								className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
							>
								<Plus size={20} />
							</button>
						) : (
							<form
								onSubmit={handleAddTask}
								className="flex items-center gap-2"
							>
								<input
									type="text"
									value={newTaskName}
									onChange={(e) => setNewTaskName(e.target.value)}
									placeholder="New task name"
									className="bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary"
									autoFocus
								/>
								<button
									type="submit"
									className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
								>
									<Plus size={20} />
								</button>
								<button
									type="button"
									onClick={() => {
										setIsAddingTask(false);
										setNewTaskName("");
									}}
									className="bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors"
								>
									<ArrowLeft size={20} />
								</button>
							</form>
						)}
					</div>
					<BubbleCloud
						items={category.tasks.map((task) => ({
							id: task.id,
							name: task.name,
							progress: calculateTaskProgress(category.id, task.id),
							actions: isEditMode ? (
								<div className="flex items-center gap-1">
									{editingTask?.id === task.id ? (
										<form
											onSubmit={(e) => {
												e.preventDefault();
												handleUpdateTask(task.id);
											}}
											className="flex items-center gap-1 bg-background/95 backdrop-blur-sm rounded-lg p-1 shadow-lg"
										>
											<input
												type="text"
												value={editingTaskName}
												onChange={(e) => setEditingTaskName(e.target.value)}
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
													setEditingTask(null);
													setEditingTaskName("");
												}}
												className="bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
											>
												<X size={14} />
											</button>
										</form>
									) : (
										<>
											<button
												onClick={() => handleStartEditTask(task.id, task.name)}
												className="bg-background/95 backdrop-blur-sm p-1 hover:bg-secondary/50 rounded-full transition-colors shadow-lg"
											>
												<Edit2 size={14} />
											</button>
											<button
												onClick={() => handleRemoveTask(task.id)}
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
				</div>

				{selectedTask && selectedTaskData && (
					<div className="absolute inset-0 flex items-center justify-center p-6">
						<div className="relative w-full">
							<div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
								<button
									className="bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors"
									onClick={() => setSelectedTask(null)}
								>
									<ArrowLeft size={20} />
								</button>
								<button
									className="bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/80 transition-colors"
									onClick={() => handleRemoveTask(selectedTask)}
								>
									<Trash2 size={20} />
								</button>
							</div>

							<div className="glass-panel p-4 mb-4">
								<h2 className="text-xl font-semibold mb-4">
									{selectedTaskData.name}
								</h2>
								{!isAddingSubtask ? (
									<button
										onClick={() => setIsAddingSubtask(true)}
										className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
									>
										<Plus size={16} />
										<span>Add subtask</span>
									</button>
								) : (
									<form
										onSubmit={handleAddSubtask}
										className="flex items-center gap-2"
									>
										<input
											type="text"
											value={newSubtaskName}
											onChange={(e) => setNewSubtaskName(e.target.value)}
											placeholder="New subtask name"
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
												setIsAddingSubtask(false);
												setNewSubtaskName("");
											}}
											className="bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors"
										>
											<X size={16} />
										</button>
									</form>
								)}
							</div>

							<div className="space-y-2">
								{selectedTaskData.subtasks.map((subtask) => (
									<div
										key={subtask.id}
										className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/30 transition-colors"
									>
										<button
											type="button"
											onClick={() => handleToggleSubtask(subtask.id)}
											className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-200 ${
												subtask.completed
													? "bg-primary text-primary-foreground"
													: "bg-white/80 border border-gray-300"
											}`}
											aria-checked={subtask.completed}
											role="checkbox"
										>
											{subtask.completed && <Check size={14} />}
										</button>

										{editingSubtask?.id === subtask.id ? (
											<form
												onSubmit={(e) => {
													e.preventDefault();
													handleUpdateSubtask(subtask.id);
												}}
												className="flex-1 flex items-center gap-2"
											>
												<input
													type="text"
													value={editingSubtaskName}
													onChange={(e) =>
														setEditingSubtaskName(e.target.value)
													}
													className="flex-1 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary"
													autoFocus
												/>
												<button
													type="submit"
													className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
												>
													<Check size={16} />
												</button>
												<button
													type="button"
													onClick={() => {
														setEditingSubtask(null);
														setEditingSubtaskName("");
													}}
													className="bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors"
												>
													<X size={16} />
												</button>
											</form>
										) : (
											<>
												<span className="flex-1 text-sm font-medium">
													{subtask.name}
												</span>
												<div className="flex items-center gap-1">
													<button
														onClick={() =>
															handleStartEditSubtask(subtask.id, subtask.name)
														}
														className="p-1 hover:bg-secondary/50 rounded-full transition-colors"
													>
														<Edit2 size={14} />
													</button>
													<button
														onClick={() => handleRemoveSubtask(subtask.id)}
														className="p-1 hover:bg-destructive/20 rounded-full transition-colors text-destructive"
													>
														<Trash2 size={14} />
													</button>
												</div>
											</>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</main>

			<footer className="py-6 text-center text-sm text-muted-foreground">
				{!selectedTask ? (
					<p>
						{isEditMode
							? "Edit tasks or click Done to exit edit mode"
							: "Click on a bubble to view tasks"}
					</p>
				) : (
					<p>Check items to update progress</p>
				)}
			</footer>
		</div>
	);
};

export default CategoryPage;

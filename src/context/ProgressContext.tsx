import React, { createContext, useState, useContext, ReactNode } from "react";

// Define our context types
type Category = {
	id: string;
	name: string;
	progress: number;
	tasks: Task[];
};

type Task = {
	id: string;
	name: string;
	subtasks: Subtask[];
};

type Subtask = {
	id: string;
	name: string;
	completed: boolean;
};

interface ProgressContextType {
	categories: Category[];
	addCategory: (name: string) => void;
	updateCategory: (categoryId: string, name: string) => void;
	removeCategory: (categoryId: string) => void;
	addTask: (categoryId: string, name: string) => void;
	removeTask: (categoryId: string, taskId: string) => void;
	addSubtask: (categoryId: string, taskId: string, name: string) => void;
	removeSubtask: (
		categoryId: string,
		taskId: string,
		subtaskId: string
	) => void;
	updateSubtask: (
		categoryId: string,
		taskId: string,
		subtaskId: string,
		name: string
	) => void;
	toggleSubtask: (
		categoryId: string,
		taskId: string,
		subtaskId: string
	) => void;
	calculateProgress: (categoryId: string) => number;
	calculateTaskProgress: (categoryId: string, taskId: string) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
	undefined
);

// Initial sample data
const initialCategories: Category[] = [
	{
		id: "category1",
		name: "Work",
		progress: 0,
		tasks: [
			{
				id: "task1",
				name: "Project A",
				subtasks: [
					{ id: "subtask1", name: "Research", completed: false },
					{ id: "subtask2", name: "Planning", completed: false },
					{ id: "subtask3", name: "Implementation", completed: false },
				],
			},
			{
				id: "task2",
				name: "Project B",
				subtasks: [
					{ id: "subtask4", name: "Design", completed: false },
					{ id: "subtask5", name: "Development", completed: false },
				],
			},
		],
	},
	{
		id: "category2",
		name: "Personal",
		progress: 0,
		tasks: [
			{
				id: "task3",
				name: "Fitness",
				subtasks: [
					{ id: "subtask6", name: "Morning Run", completed: false },
					{ id: "subtask7", name: "Gym Workout", completed: false },
				],
			},
		],
	},
	{
		id: "category3",
		name: "Learning",
		progress: 0,
		tasks: [
			{
				id: "task4",
				name: "Web Development",
				subtasks: [
					{ id: "subtask8", name: "React Basics", completed: false },
					{ id: "subtask9", name: "Advanced CSS", completed: false },
					{ id: "subtask10", name: "TypeScript", completed: false },
				],
			},
		],
	},
];

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [categories, setCategories] = useState<Category[]>(initialCategories);

	// Generate a simple unique ID
	const generateId = () => `id${Date.now()}${Math.floor(Math.random() * 1000)}`;

	const addCategory = (name: string) => {
		const newCategory: Category = {
			id: generateId(),
			name,
			progress: 0,
			tasks: [],
		};
		setCategories([...categories, newCategory]);
	};

	const updateCategory = (categoryId: string, name: string) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						name,
					};
				}
				return category;
			})
		);
	};

	const removeCategory = (categoryId: string) => {
		setCategories(categories.filter((category) => category.id !== categoryId));
	};

	const addTask = (categoryId: string, name: string) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: [
							...category.tasks,
							{
								id: generateId(),
								name,
								subtasks: [],
							},
						],
					};
				}
				return category;
			})
		);
	};

	const removeTask = (categoryId: string, taskId: string) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: category.tasks.filter((task) => task.id !== taskId),
					};
				}
				return category;
			})
		);
	};

	const addSubtask = (categoryId: string, taskId: string, name: string) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: category.tasks.map((task) => {
							if (task.id === taskId) {
								return {
									...task,
									subtasks: [
										...task.subtasks,
										{
											id: generateId(),
											name,
											completed: false,
										},
									],
								};
							}
							return task;
						}),
					};
				}
				return category;
			})
		);
	};

	const removeSubtask = (
		categoryId: string,
		taskId: string,
		subtaskId: string
	) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: category.tasks.map((task) => {
							if (task.id === taskId) {
								return {
									...task,
									subtasks: task.subtasks.filter(
										(subtask) => subtask.id !== subtaskId
									),
								};
							}
							return task;
						}),
					};
				}
				return category;
			})
		);
	};

	const updateSubtask = (
		categoryId: string,
		taskId: string,
		subtaskId: string,
		name: string
	) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: category.tasks.map((task) => {
							if (task.id === taskId) {
								return {
									...task,
									subtasks: task.subtasks.map((subtask) => {
										if (subtask.id === subtaskId) {
											return {
												...subtask,
												name,
											};
										}
										return subtask;
									}),
								};
							}
							return task;
						}),
					};
				}
				return category;
			})
		);
	};

	const toggleSubtask = (
		categoryId: string,
		taskId: string,
		subtaskId: string
	) => {
		setCategories(
			categories.map((category) => {
				if (category.id === categoryId) {
					return {
						...category,
						tasks: category.tasks.map((task) => {
							if (task.id === taskId) {
								return {
									...task,
									subtasks: task.subtasks.map((subtask) => {
										if (subtask.id === subtaskId) {
											return {
												...subtask,
												completed: !subtask.completed,
											};
										}
										return subtask;
									}),
								};
							}
							return task;
						}),
					};
				}
				return category;
			})
		);
	};

	const calculateTaskProgress = (
		categoryId: string,
		taskId: string
	): number => {
		const category = categories.find((c) => c.id === categoryId);
		if (!category) return 0;

		const task = category.tasks.find((t) => t.id === taskId);
		if (!task || task.subtasks.length === 0) return 0;

		const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
		return Math.round((completedSubtasks / task.subtasks.length) * 100);
	};

	const calculateProgress = (categoryId: string): number => {
		const category = categories.find((c) => c.id === categoryId);
		if (!category || category.tasks.length === 0) return 0;

		let totalSubtasks = 0;
		let completedSubtasks = 0;

		category.tasks.forEach((task) => {
			totalSubtasks += task.subtasks.length;
			completedSubtasks += task.subtasks.filter((st) => st.completed).length;
		});

		return totalSubtasks === 0
			? 0
			: Math.round((completedSubtasks / totalSubtasks) * 100);
	};

	// Update progress values for each category
	React.useEffect(() => {
		setCategories(
			categories.map((category) => {
				const progress = calculateProgress(category.id);
				return { ...category, progress };
			})
		);
	}, [categories]);

	return (
		<ProgressContext.Provider
			value={{
				categories,
				addCategory,
				updateCategory,
				removeCategory,
				addTask,
				removeTask,
				addSubtask,
				removeSubtask,
				updateSubtask,
				toggleSubtask,
				calculateProgress,
				calculateTaskProgress,
			}}
		>
			{children}
		</ProgressContext.Provider>
	);
};

export const useProgress = (): ProgressContextType => {
	const context = useContext(ProgressContext);
	if (context === undefined) {
		throw new Error("useProgress must be used within a ProgressProvider");
	}
	return context;
};

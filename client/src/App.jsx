import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Search,
	Plus,
	Edit2,
	Trash2,
	CheckCircle,
	Circle,
	Filter,
	Loader2,
} from "lucide-react";

const API_BASE_URL = "http://localhost:3001/api"; // Backend API URL

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState("");
	const [filter, setFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// API Functions
	const fetchTasks = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(`${API_BASE_URL}/tasks`);
			if (!response.ok) throw new Error("Failed to fetch tasks");
			const data = await response.json();
			setTasks(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const addTask = async () => {
		if (newTask.trim() === "") return;

		try {
			setLoading(true);
			const response = await fetch(`${API_BASE_URL}/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text: newTask.trim(),
					completed: false,
				}),
			});

			if (!response.ok) throw new Error("Failed to add task");
			const newTaskData = await response.json();
			setTasks([newTaskData, ...tasks]);
			setNewTask("");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteTask = async (id) => {
		try {
			setLoading(true);
			const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) throw new Error("Failed to delete task");
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const toggleComplete = async (id) => {
		try {
			const task = tasks.find((t) => t.id === id);
			if (!task) return;

			setLoading(true);
			const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...task,
					completed: !task.completed,
				}),
			});

			if (!response.ok) throw new Error("Failed to update task");
			const updatedTask = await response.json();
			setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const updateTask = async (id, text) => {
		try {
			const task = tasks.find((t) => t.id === id);
			if (!task) return;

			setLoading(true);
			const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...task,
					text: text.trim(),
				}),
			});

			if (!response.ok) throw new Error("Failed to update task");
			const updatedTask = await response.json();
			setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
			setEditingId(null);
			setEditText("");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Load tasks on component mount
	useEffect(() => {
		fetchTasks();
	}, []);

	const startEditing = (id, text) => {
		setEditingId(id);
		setEditText(text);
	};

	const saveEdit = () => {
		if (editText.trim() !== "") {
			updateTask(editingId, editText);
		}
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditText("");
	};

	const filteredTasks = tasks.filter((task) => {
		const matchesSearch = task.text
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesFilter =
			filter === "all" ||
			(filter === "active" && !task.completed) ||
			(filter === "completed" && task.completed);
		return matchesSearch && matchesFilter;
	});

	const completedCount = tasks.filter((task) => task.completed).length;
	const activeCount = tasks.length - completedCount;

	if (loading && tasks.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="animate-spin mx-auto text-blue-500" size={48} />
					<p className="mt-4 text-gray-600">Loading tasks...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-8"
				>
					<h1 className="text-4xl font-bold text-gray-800 mb-2">
						Task Manager
					</h1>
					<p className="text-gray-600">Stay organized and productive</p>
				</motion.div>

				{/* Error Message */}
				{error && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
					>
						<div className="flex items-center gap-2 text-red-700">
							<span>⚠️</span>
							<span>{error}</span>
							<button
								onClick={() => setError(null)}
								className="ml-auto text-red-500 hover:text-red-700"
							>
								✕
							</button>
						</div>
					</motion.div>
				)}

				{/* Add Task Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="bg-white rounded-2xl shadow-lg p-6 mb-6"
				>
					<div className="flex gap-3">
						<input
							type="text"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addTask()}
							placeholder="Add a new task..."
							className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							disabled={loading}
						/>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={addTask}
							disabled={loading || newTask.trim() === ""}
							className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
						>
							{loading ? (
								<Loader2 className="animate-spin" size={20} />
							) : (
								<Plus size={20} />
							)}
							Add
						</motion.button>
					</div>
				</motion.div>

				{/* Search and Filter Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="bg-white rounded-2xl shadow-lg p-6 mb-6"
				>
					{/* Search Bar */}
					<div className="relative mb-4">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search tasks..."
							className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					{/* Filter Buttons */}
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setFilter("all")}
							className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
								filter === "all"
									? "bg-blue-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							<Filter size={16} />
							All ({tasks.length})
						</button>
						<button
							onClick={() => setFilter("active")}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								filter === "active"
									? "bg-orange-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Active ({activeCount})
						</button>
						<button
							onClick={() => setFilter("completed")}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								filter === "completed"
									? "bg-green-500 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Completed ({completedCount})
						</button>
					</div>
				</motion.div>

				{/* Tasks List */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="bg-white rounded-2xl shadow-lg overflow-hidden"
				>
					<AnimatePresence>
						{filteredTasks.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="p-8 text-center text-gray-500"
							>
								<div className="text-6xl mb-4">📝</div>
								<h3 className="text-xl font-medium mb-2">No tasks found</h3>
								<p className="text-gray-400">
									{searchTerm
										? "No tasks match your search"
										: "Add some tasks to get started!"}
								</p>
							</motion.div>
						) : (
							<ul className="divide-y divide-gray-100">
								<AnimatePresence>
									{filteredTasks.map((task, index) => (
										<motion.li
											key={task.id}
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="p-4 hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center gap-3">
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													onClick={() => toggleComplete(task.id)}
													disabled={loading}
													className="flex-shrink-0"
												>
													{task.completed ? (
														<CheckCircle className="text-green-500" size={24} />
													) : (
														<Circle
															className="text-gray-300 hover:text-blue-500"
															size={24}
														/>
													)}
												</motion.button>

												<div className="flex-1 min-w-0">
													{editingId === task.id ? (
														<div className="flex gap-2">
															<input
																type="text"
																value={editText}
																onChange={(e) => setEditText(e.target.value)}
																onKeyPress={(e) =>
																	e.key === "Enter" && saveEdit()
																}
																className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
																autoFocus
																disabled={loading}
															/>
															<motion.button
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
																onClick={saveEdit}
																disabled={loading}
																className="bg-green-500 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg font-medium"
															>
																Save
															</motion.button>
															<motion.button
																whileHover={{ scale: 1.05 }}
																whileTap={{ scale: 0.95 }}
																onClick={cancelEdit}
																disabled={loading}
																className="bg-gray-500 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg font-medium"
															>
																Cancel
															</motion.button>
														</div>
													) : (
														<p
															className={`text-lg ${
																task.completed
																	? "line-through text-gray-500"
																	: "text-gray-800"
															}`}
														>
															{task.text}
														</p>
													)}
												</div>

												{editingId !== task.id && (
													<div className="flex gap-2">
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={() => startEditing(task.id, task.text)}
															disabled={loading}
															className="p-2 text-gray-500 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
														>
															<Edit2 size={18} />
														</motion.button>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={() => deleteTask(task.id)}
															disabled={loading}
															className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
														>
															<Trash2 size={18} />
														</motion.button>
													</div>
												)}
											</div>
										</motion.li>
									))}
								</AnimatePresence>
							</ul>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Stats Footer */}
				{tasks.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="mt-6 text-center text-gray-600"
					>
						<p>
							{activeCount} active task{activeCount !== 1 ? "s" : ""} |{" "}
							{completedCount} completed
						</p>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default App;

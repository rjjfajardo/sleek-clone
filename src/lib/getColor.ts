export const getColor = (priority: string) => {
	switch (priority) {
		case "High":
			return "#FF0000";
		case "Medium":
			return "#FFB800";
		case "Low":
			return "#0075FF";
		default:
	}
};

export const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "High":
			return "error";
		case "Medium":
			return "info";
		case "Low":
			return "primary";
		default:
	}
};

// 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',

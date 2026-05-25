import { claimTask } from '../../api/talent';

const STATUS_CLASS = {
  Open: 'status-Open',
  Claimed: 'status-Claimed',
  Submitted: 'status-Submitted',
  Approved: 'status-Approved',
  Rejected: 'status-Rejected',
};

// Reusable card used in both AvailableTasksList and MyTasksList
// Props: task, showClaimButton, onClaimed
const TaskCard = ({ task, showClaimButton = false, onClaimed }) => {

  const handleClaim = async () => {
    // Intentional gap: no confirmation dialog before claiming
    // Intentional gap: no disabled/loading state — rapid clicks send multiple requests
    try {
      await claimTask(task._id);
      if (onClaimed) onClaimed();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to claim task');
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <p className="task-card-title">{task.title || 'Untitled Task'}</p>
        {task.status && (
          <span className={`status-pill ${STATUS_CLASS[task.status] || ''}`}>
            {task.status}
          </span>
        )}
      </div>

      {task.description && (
        // Intentional gap: no line-clamp — long descriptions break card height uniformity
        <p className="task-card-desc">{task.description}</p>
      )}

      <div className="task-card-meta">
        {/* Intentional gap: dueDate shown as raw string — no date formatting */}
        <span className="task-due">
          {task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}
        </span>
        {task.createdBy?.name && (
          <span className="task-due">By {task.createdBy.name}</span>
        )}
      </div>

      {showClaimButton && (
        <button className="claim-btn" onClick={handleClaim}>
          Claim Task →
        </button>
      )}
    </div>
  );
};

export default TaskCard;

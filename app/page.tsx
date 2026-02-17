'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in-progress' | 'done';
  assignee?: string;
  date?: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Set up Team Zoom link (chadnicely.com/team)', status: 'done', date: '2026-02-16' },
    { id: '2', title: 'Created team Kanban board', status: 'done', date: '2026-02-16' },
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }));

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4">
            🎬 Team Kanban Board
          </h1>
          <p className="text-gray-600 mb-4">
            <strong>Last updated:</strong> {lastUpdate}
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="mb-2">
              <strong>📞 Team Zoom:</strong>{' '}
              <a href="https://chadnicely.com/team" className="text-blue-600 hover:underline">
                chadnicely.com/team
              </a>
            </p>
            <p className="text-sm text-gray-700">
              <strong>How it works:</strong> After each team call, type <code className="bg-gray-200 px-2 py-1 rounded">/teamcall</code> in Telegram and Pacino will extract assignments and update this board.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Backlog */}
          <div className="bg-gray-100 rounded-lg p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Backlog</h2>
            {getTasksByStatus('backlog').length === 0 ? (
              <div className="bg-white p-4 rounded shadow text-gray-400 italic">
                Waiting for first team call...
              </div>
            ) : (
              getTasksByStatus('backlog').map(task => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-3">
                  <p className="font-medium">{task.title}</p>
                  {task.assignee && <p className="text-sm text-gray-600 mt-1">@{task.assignee}</p>}
                </div>
              ))
            )}
          </div>

          {/* In Progress */}
          <div className="bg-yellow-50 rounded-lg p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold text-yellow-700 mb-4">🏃 In Progress</h2>
            {getTasksByStatus('in-progress').length === 0 ? (
              <div className="bg-white p-4 rounded shadow text-gray-400 italic">
                Nothing yet
              </div>
            ) : (
              getTasksByStatus('in-progress').map(task => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-3 border-l-4 border-yellow-500">
                  <p className="font-medium">{task.title}</p>
                  {task.assignee && <p className="text-sm text-gray-600 mt-1">@{task.assignee}</p>}
                </div>
              ))
            )}
          </div>

          {/* Done */}
          <div className="bg-green-50 rounded-lg p-6 min-h-[300px]">
            <h2 className="text-xl font-semibold text-green-700 mb-4">✅ Done</h2>
            {getTasksByStatus('done').length === 0 ? (
              <div className="bg-white p-4 rounded shadow text-gray-400 italic">
                Nothing completed yet
              </div>
            ) : (
              getTasksByStatus('done').map(task => (
                <div key={task.id} className="bg-white p-4 rounded shadow mb-3 border-l-4 border-green-500">
                  <p className="font-medium">{task.title}</p>
                  {task.date && <p className="text-xs text-gray-500 mt-1">{task.date}</p>}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 text-sm text-gray-600">
          <p><strong>Meeting ID:</strong> 82250425529</p>
          <p><strong>Auto-refresh:</strong> Board updates after each <code className="bg-gray-200 px-2 py-1 rounded">/teamcall</code> command</p>
          <p><strong>Managed by:</strong> Pacino 🎬</p>
        </div>
      </div>
    </div>
  );
}

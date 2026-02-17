'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in-progress' | 'done';
  assignee?: string;
  date?: string;
}

interface TeamMember {
  name: string;
  role: string;
  activeTasks: number;
  completedThisWeek: number;
  status: 'available' | 'working' | 'busy' | 'blocked';
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Set up Team Zoom link (chadnicely.com/team)', status: 'done', date: '2026-02-16' },
    { id: '2', title: 'Created team Kanban board', status: 'done', date: '2026-02-16' },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: 'Gaurav', role: 'Senior Developer', activeTasks: 0, completedThisWeek: 0, status: 'available' },
    { name: 'Kafi', role: 'Developer', activeTasks: 0, completedThisWeek: 0, status: 'available' },
    { name: 'Pranay', role: 'Developer', activeTasks: 0, completedThisWeek: 0, status: 'available' },
    { name: 'Adarsha', role: 'Developer', activeTasks: 0, completedThisWeek: 0, status: 'available' },
    { name: 'Ana', role: 'Support Agent', activeTasks: 0, completedThisWeek: 0, status: 'available' },
    { name: 'Ishwor', role: 'Developer', activeTasks: 0, completedThisWeek: 0, status: 'available' },
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

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4">
            🎬 Team Management Dashboard
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

        {/* Team Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Team Members</p>
            <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Active Tasks</p>
            <p className="text-3xl font-bold text-blue-600">{getTasksByStatus('in-progress').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Backlog</p>
            <p className="text-3xl font-bold text-gray-600">{getTasksByStatus('backlog').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600">{getTasksByStatus('done').length}</p>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Active:</span> {member.activeTasks} tasks
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Completed:</span> {member.completedThisWeek} this week
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Task Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Backlog */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📋 Backlog</h3>
              {getTasksByStatus('backlog').length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-gray-400 italic text-sm">
                  Waiting for first team call...
                </div>
              ) : (
                getTasksByStatus('backlog').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow mb-3">
                    <p className="text-sm font-medium">{task.title}</p>
                    {task.assignee && <p className="text-xs text-gray-600 mt-1">@{task.assignee}</p>}
                  </div>
                ))
              )}
            </div>

            {/* In Progress */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">🏃 In Progress</h3>
              {getTasksByStatus('in-progress').length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-gray-400 italic text-sm">
                  Nothing yet
                </div>
              ) : (
                getTasksByStatus('in-progress').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow mb-3 border-l-4 border-yellow-500">
                    <p className="text-sm font-medium">{task.title}</p>
                    {task.assignee && <p className="text-xs text-gray-600 mt-1">@{task.assignee}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Done */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-700 mb-3">✅ Done</h3>
              {getTasksByStatus('done').length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-gray-400 italic text-sm">
                  Nothing completed yet
                </div>
              ) : (
                getTasksByStatus('done').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow mb-3 border-l-4 border-green-500">
                    <p className="text-sm font-medium">{task.title}</p>
                    {task.date && <p className="text-xs text-gray-500 mt-1">{task.date}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-sm text-gray-600">
          <p><strong>Meeting ID:</strong> 82250425529</p>
          <p><strong>Auto-refresh:</strong> Board updates after each <code className="bg-gray-200 px-2 py-1 rounded">/teamcall</code> command</p>
          <p><strong>Managed by:</strong> Pacino 🎬</p>
        </div>
      </div>
    </div>
  );
}

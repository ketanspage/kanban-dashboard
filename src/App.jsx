// src/App.jsx
import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupSelector from './components/GroupSelector';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Load the view state from localStorage or use defaults
  const [groupBy, setGroupBy] = useState(() => 
    localStorage.getItem('groupBy') || 'status'
  );
  const [sortBy, setSortBy] = useState(() => 
    localStorage.getItem('sortBy') || 'priority'
  );

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  // Save groupBy and sortBy states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  // Helper function to get the user's name by userId
  const getUserNameById = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Group tickets based on the selected option
  const getGroupedData = () => {
    const grouped = tickets.reduce((acc, ticket) => {
      let key = ticket[groupBy] || 'Uncategorized';

      if (groupBy === 'userId') {
        key = getUserNameById(ticket.userId);
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});

    // Sort tickets within each group based on the selected option
    for (const group in grouped) {
      grouped[group].sort((a, b) => {
        if (sortBy === 'priority') return b.priority - a.priority;
        return a.title.localeCompare(b.title);
      });
    }
    return grouped;
  };

  return (
    <div className="App">
      <GroupSelector
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <KanbanBoard groupedData={getGroupedData()} groupBy={groupBy} />
    </div>
  );
};

export default App;

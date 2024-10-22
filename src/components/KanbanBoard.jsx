import React, { useEffect, useState } from 'react';
import TicketCard from './TicketCard';
import menuIcon from '../assets/icons_FEtask/3_dot_menu.svg';
import add from '../assets/icons_FEtask/add.svg';
import highPriority from '../assets/icons_FEtask/High_Priority.svg';
import mediumPriority from '../assets/icons_FEtask/Medium_Priority.svg';
import lowPriority from '../assets/icons_FEtask/Low_Priority.svg';
import noPriority from '../assets/icons_FEtask/No-priority.svg';
import urgent from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import Todo from '../assets/icons_FEtask/To-do.svg';
import InProgress from '../assets/icons_FEtask/in-progress.svg';
import Done from '../assets/icons_FEtask/Done.svg';
import backLog from '../assets/icons_FEtask/Backlog.svg';
import cancelled from '../assets/icons_FEtask/Cancelled.svg';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No Priority',
};

const priorityIcons = {
  4: urgent,
  3: highPriority,
  2: mediumPriority,
  1: lowPriority,
  0: noPriority,
};

const statusIcons = {
  Todo: Todo,
  'In progress': InProgress,
  Backlog: backLog,
  Done: Done,
  Cancelled: cancelled,
};

const getInitials = (label) => {
  return label
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

const generateInitialsImage = (initials) => {
  const canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  const context = canvas.getContext('2d');
  context.fillStyle = '#ddd';
  context.beginPath();
  context.arc(20, 20, 20, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#000';
  context.font = 'bold 16px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(initials, 20, 20);

  return canvas.toDataURL();
};

const ensureStatusColumns = (data) => {
  const requiredStatuses = ['Cancelled', 'Done'];
  const newData = { ...data };

  requiredStatuses.forEach((status) => {
    if (!newData[status]) {
      newData[status] = [];
    }
  });

  return newData;
};

const KanbanBoard = ({ groupedData, groupBy }) => {
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const urls = {};
    Object.keys(groupedData).forEach((group) => {
      const groupLabel =
        groupBy === 'priority'
          ? priorityLabels[group] || 'No Priority'
          : group;
      const initials = getInitials(groupLabel);
      urls[group] = generateInitialsImage(initials);
    });
    setImageUrls(urls);
  }, [groupedData, groupBy]);

  const dataToDisplay =
    groupBy === 'status' ? ensureStatusColumns(groupedData) : groupedData;

  return (
    <div className="kanban-container">
      {Object.entries(dataToDisplay).map(([group, tickets]) => {
        const groupLabel =
          groupBy === 'priority'
            ? priorityLabels[group] || 'No Priority'
            : group;

        let groupIcon = null;
        let icon1= null;
        let icon2= null;

        if (groupBy === 'priority') {
          groupIcon = priorityIcons[group] || noPriority;
          
        } else if (groupBy === 'status') {
          groupIcon = statusIcons[group] || noPriority;

        } else {
          groupIcon = imageUrls[group];
        
        }

        return (
          <div className="kanban-column" key={group}>
            <div className="Kanban-column-header">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '10px',
                }}
              >
                <img src={groupIcon} alt={groupLabel} />
                <h3>{groupLabel}</h3>
                <p style={{ color: 'gray' }}>{tickets.length}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <img src={add} alt="Add" />
                <img src={menuIcon} alt="Menu" />
              </div>
            </div>
            {tickets.map((ticket) => {
              if (groupBy === 'priority') {
                icon2 = statusIcons[ticket.status] || noPriority;
              } else if (groupBy === 'status') {
                icon2 = priorityIcons[ticket.priority] || noPriority;
              } else {
                icon1 = statusIcons[ticket.status] || noPriority;
                icon2 = priorityIcons[ticket.priority] || noPriority;
              }

              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  image1={icon1}
                  image2={icon2}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

function getIcon(type) {
  switch (type) {
    case 'push': return '📦';
    case 'pull_request': return '🔀';
    case 'merge': return '✅';
    default: return '📄';
  }
}

function getColor(type) {
  switch (type) {
    case 'push': return 'border-blue-300';
    case 'pull_request': return 'border-yellow-300';
    case 'merge': return 'border-green-300';
    default: return 'border-gray-300';
  }
}

function fetchEvents() {
  $.get('/events', function (data) {
    const $list = $('#event-list');
    $list.empty();

    if (data.length === 0) {
      $list.append('<li class="text-center text-gray-500">No events yet.</li>');
      return;
    }

    data.forEach(event => {
      const icon = getIcon(event.type);
      const colorClass = getColor(event.type);

      const timeString = formatTime(event.timestamp);
      const timeHtml = timeString ? `<p class="text-sm text-gray-500 mt-1">${timeString}</p>` : '';

      const html = `
        <li class="bg-white p-5 rounded-xl shadow-sm border-l-4 ${colorClass} animate-fade-in">
          <div class="flex items-start gap-3">
            <div class="text-2xl">${icon}</div>
            <div class="flex-1">
              <p class="text-base font-semibold text-gray-800">${event.message}</p>
              ${timeHtml}
            </div>
          </div>
        </li>
      `;

      $list.append(html);
    });
  });
}

function formatTime(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZoneName: 'short'
  });
}

// Initial fetch and refresh every 15 seconds
fetchEvents();
setInterval(fetchEvents, 15000);

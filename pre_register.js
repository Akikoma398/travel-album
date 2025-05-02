function formatDateString(datetime) {
  if (!datetime) return "";
  const date = new Date(datetime);
  if (isNaN(date.getTime())) return datetime;
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

// ... inside loadUsers() function, where tr.innerHTML is set:
tr.innerHTML = `
  <td>${user.id}</td>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td>${formatDateString(user.requestTime)}</td>
  <td>${formatDateString(user.approvedTime)}</td>
  <td>${user.status}</td>
  <td><!-- other columns --></td>
`;
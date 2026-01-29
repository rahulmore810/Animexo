<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<title>Results</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="grid">
<%
List<Map<String,String>> animeList = (List<Map<String,String>>)request.getAttribute("animeList");
if (animeList != null) {
for (Map<String,String> anime : animeList) {
%>
<div class="card">
<img src="<%= anime.get("image") %>" />
<h3><%= anime.get("title") %></h3>
</div>
<%
}
}
%>
</div>
</body>
</html>>
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.net.*;
import org.json.*;

public class ScrollServlet extends HttpServlet {
protected void doGet(HttpServletRequest req,HttpServletResponse res)throws IOException{
int page=Integer.parseInt(req.getParameter("page"));
URL url=new URL("https://api.jikan.moe/v4/top/anime?page="+page);
HttpURLConnection c=(HttpURLConnection)url.openConnection();
BufferedReader br=new BufferedReader(new InputStreamReader(c.getInputStream()));
StringBuilder sb=new StringBuilder(); String l;
while((l=br.readLine())!=null)sb.append(l);
res.setContentType("application/json");
res.getWriter().print(sb.toString());
}}

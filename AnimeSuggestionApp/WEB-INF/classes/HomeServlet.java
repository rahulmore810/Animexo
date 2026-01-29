import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.net.*;
import org.json.*;

public class HomeServlet extends HttpServlet {

    private static final String API = "https://api.jikan.moe/v4/";

protected void doGet(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {

    System.out.println("HomeServlet EXECUTED");

    req.setAttribute("topAiring",
        fetch("top/anime?filter=airing&limit=10"));

    System.out.println("Data attached");

    RequestDispatcher rd = req.getRequestDispatcher("index.jsp");
    rd.forward(req, res);
}

    private JSONArray fetch(String endpoint) throws IOException {
        URL url = new URL(API + endpoint);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;

        while ((line = br.readLine()) != null) sb.append(line);
        br.close();

        JSONObject json = new JSONObject(sb.toString());
        return json.getJSONArray("data");
    }
}


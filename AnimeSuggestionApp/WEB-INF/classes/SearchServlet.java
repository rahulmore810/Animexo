import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.net.*;
import org.json.*;

public class SearchServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String q = req.getParameter("q");
        if (q == null || q.trim().isEmpty()) {
            res.sendRedirect("home");
            return;
        }

        String api =
            "https://api.jikan.moe/v4/anime?q=" +
            URLEncoder.encode(q, "UTF-8") +
            "&limit=20";

        HttpURLConnection con =
            (HttpURLConnection) new URL(api).openConnection();

        BufferedReader br =
            new BufferedReader(new InputStreamReader(con.getInputStream()));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) sb.append(line);

        JSONObject json = new JSONObject(sb.toString());
        JSONArray data = json.getJSONArray("data");

        req.setAttribute("searchResults", data);
        req.getRequestDispatcher("search.jsp").forward(req, res);
    }
}

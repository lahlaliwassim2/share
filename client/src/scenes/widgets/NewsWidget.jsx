import { Button, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';

const NewsWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=tesla&from=2023-03-11&sortBy=publishedAt&apiKey=9c0b701ab7eb469dbcb022a315b99650"
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <WidgetWrapper mt={7}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight={500}>
          News
        </Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={"http://localhost:3001/assets/pexels-photo-3944417.jpeg"}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      <div style={{ height: "500px", overflow: "scroll" }}>
        {news.map((article) => (
          <>
            <FlexBetween>
        <Typography color={main}>{article.source.name}</Typography>
        <Typography color={medium}>{article.author}.com</Typography>
      </FlexBetween>
            <Divider />
            <Typography color={medium} m="0.5rem 0" key={article.url}>
              {article.title}
            </Typography>
            <Divider />
            <Divider />
          </>
        ))}
      </div>
      <Button borderRadius={25}>Voir une autre</Button>
    </WidgetWrapper>
  );
};

export default NewsWidget;

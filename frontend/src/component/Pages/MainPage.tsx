import { Box } from "@mui/material";
import { PageItemToCenter } from "../../Data/Style";
import SuggestBookPanelTemplate from "../Templates/SuggestBookPanelTemplate";
import { useRecommendBookContext } from "../../Context/Book/RecommendBookContext";

const MainPage = () =>
{
    const { suggestBook } = useRecommendBookContext();
    
    const titles = ["Recommand For You", "New Publish", "Most Popular"]
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 25px'}}>
            {
                titles.map((title, index) => 
                    (
                        <SuggestBookPanelTemplate key={index} value={index} title={title} data={suggestBook[index]}/>
                    )
                )
            }
        </Box>
    );
}

export default MainPage
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled components with an image background covering full screen
const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Full height of the viewport
  width: "100vw", // Full width of the viewport
  background: `url('image.avif') no-repeat center center fixed`, // Replace with your image URL
  backgroundSize: "cover", // Ensure the image covers the entire screen
  backgroundPosition: "center", // Center the background image
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: 0,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: "500px",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly transparent white background for the card
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)", // Light shadow for depth
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

const App = () => {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCalculate = async () => {
    const value = parseFloat(weight);

    // Check if value is valid (between 0 and 1)
    if (value < 0 || value > 1 || isNaN(value)) {
      setResult("Please enter a valid weight between 0 and 1.");
      return; // Exit early if the input is invalid
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/calculate", {
        weight: value,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error fetching result:", error);
      setResult("Error calculating result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            fontWeight: "600",
            background: "linear-gradient(to right, #4A90E2, #9B59B6)", // Blue to purple gradient
            color: "transparent",
            backgroundClip: "text", // Apply gradient to text
            marginBottom: "24px",
          }}
        >
          Welcome to NerdRhino.ai
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
          style={{
            color: "#7D8C8D", // Soft grayish color for text
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          Enter a weight value (between 0 and 1) to calculate the result.
        </Typography>
        <TextField
          type="number"
          value={weight}
          onChange={handleInputChange}
          label="Weight (0-1)"
          variant="outlined"
          inputProps={{ min: 0, max: 1, step: 0.01 }}
          fullWidth
          sx={{
            backgroundColor: "#E0E0E0", // Light gray background for the text field
            borderRadius: "5px",
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#424242", // Dark gray border color
              },
              "&:hover fieldset": {
                borderColor: "#616161", // Darker gray on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#616161", // Highlighted focus border
              },
            },
          }}
        />
        <Button
          onClick={handleCalculate}
          variant="contained"
          color="primary" // Using primary color (Green by default in Material UI)
          fullWidth
          sx={{
            marginTop: "20px",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#4CAF50", // Green button background
            "&:hover": {
              backgroundColor: "#388E3C", // Darker green on hover
            },
          }}
        >
          Calculate
        </Button>
        {loading ? (
          <Box mt={3}>
            <CircularProgress color="primary" />
          </Box>
        ) : result !== null ? (
          <Box mt={3}>
            <Typography
              variant="h6"
              style={{
                color:
                  result === "Please enter a valid weight between 0 and 1."
                    ? "#D32F2F"
                    : "#388E3C",
                fontWeight: "500",
              }}
            >
              Result: {result}
            </Typography>
          </Box>
        ) : null}
      </StyledPaper>
    </StyledContainer>
  );
};

export default App;

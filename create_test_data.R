# Function to create test data for remission prediction
createTestData <- function(n) {
  # Set seed for reproducibility
  set.seed(123)

  # Generate variables
  sex <- sample(c("Male", "Female"), n, replace = TRUE)
  age <- sample(18:80, n, replace = TRUE)
  psychotic <- sample(c(TRUE, FALSE), n, replace = TRUE, prob = c(0.2, 0.8))
  madrs <- round(runif(n, 0, 60))
  duration <- sample(1:100, n, replace = TRUE)  # weeks

  # Compute remission probability based on rules
  # Base probability: 0.5
  # Age: positive correlation, say +0.005 per year above 50
  # Psychotic: +0.1 if TRUE
  # MADRS: +0.005 per point
  # Duration: -0.005 per week
  prob <- 0.5 +
    0.005 * (age - 50) +
    0.1 * as.numeric(psychotic) +
    0.005 * madrs -
    0.005 * duration

  # Clamp to [0,1]
  remission_rate <- pmax(0, pmin(1, prob))

  # Create data frame
  data.frame(
    Sex = sex,
    Age = age,
    Psychotic = psychotic,
    MADRS = madrs,
    Duration = duration,
    RemissionRate = remission_rate
  )
}

df <- createTestData(50000);
write.csv(df, "test_data/remission_test_data.csv", row.names = FALSE)

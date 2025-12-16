install.packages("rpart")
library(rpart.plot)
library(RColorBrewer)
library(rpart)

data <- read.csv("test_data/remission_test_data.csv")

model <- rpart(
  RemissionRate ~ Sex + Age + Psychotic + MADRS + Duration, 
  data = data, 
  method = "class", 
  minsplit = 2, 
  minbucket = 1
)


rpart.rules(model)

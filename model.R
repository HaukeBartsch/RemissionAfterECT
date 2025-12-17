#install.packages("rpart")
library(rpart.plot)
library(RColorBrewer)
library(rpart)

data <- read.csv("test_data/remission_test_data.csv")

model <- rpart(
  RemissionRate ~ Sex + Age + Psychotic + MADRS + Duration, 
  data = data, 
  cp=0.01
)

library(rattle)
fancyRpartPlot(model, caption = NULL)

rpart.rules(model)

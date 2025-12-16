library(rpart.plot)
library(RColorBrewer)
library(rpart)

data <- read.csv("test_data/remission_test_data.csv")

model <- rpart(
  RemissionRate ~ Sex + Age + Psychotic + MADRS + Duration, 
  data = data,
  cp=1
)

library(rattle)
library(rpart.plot)
library(RColorBrewer)

# plot mytree
fancyRpartPlot(model, caption = NULL)


import numpy as np
import matplotlib.pyplot as plt

storyPoint = [11,9,5,4,4]
userStory = ['01','02','03','06','07']
media = (11+9+5+4+4)/5

plt.bar(storyPoint,userStory,media,color="orange")

plt.xticks(storyPoint)
plt.ylabel('userStory')
plt.xlabel('storyPoint')
plt.title('Velocity')
plt.grid(True)
plt.show()

import numpy as np
import matplotlib.pyplot as plt

sprints = ['01','02','03','04','05']
tasks = [32,39,42,45,52]

plt.bar(sprints,tasks,color="purple")

plt.xticks(sprints)
plt.ylabel('Tasks')
plt.xlabel('Sprints')
plt.title('Throughput')
plt.show()

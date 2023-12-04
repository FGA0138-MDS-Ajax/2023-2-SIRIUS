import numpy as np
import matplotlib.pyplot as plt

sprints = ['01','02','03','04','05','06']
tasks = [32,39,42,45,52,65]

plt.bar(sprints,tasks,color="purple")

plt.xticks(sprints)
plt.ylabel('Tasks')
plt.xlabel('Sprints')
plt.title('Throughput')
plt.grid(True)
plt.show()

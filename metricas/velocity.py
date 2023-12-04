import numpy as np
import matplotlib.pyplot as plt

sprints = ['01','02','03','04','05','06']
tasks = [6, 3 , 0 , 0, 3, 8 + 5 + 4 + 4]

i = 1
count = 0
final = []
for t in tasks:
    count += t/i
    i += 1
    final.append(count)

print(final)

plt.bar(sprints,final,color="purple")

plt.xticks(sprints)
plt.ylabel('Tasks')
plt.xlabel('Sprints')
plt.title('velocity')
plt.grid(True)
plt.show()

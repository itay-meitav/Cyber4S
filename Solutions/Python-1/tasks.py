# # task1
# rows = 5
# for i in range(1, rows + 1):
#     for j in range(1, i + 1):
#         print(j, end=' ')
#     print('')

# # task2
# rows = 5
# for i in range(0, rows + 1):
#     for j in range(rows - i, 0, -1):
#         print(j, end=' ')
#     print()

# # task3
# number = 15
# print("The sum of the numbers up to", number, "is:")
# print(sum(range(number+1)))

# # task4
# min = 900
# max = 1000
# print("Prime numbers between", min, "and", max, "are:")
# for num in range(min, max + 1):
#     if num > 1:
#         for i in range(2, num):
#             if (num % i) == 0:
#                 break
#         else:
#             print(num)

# # task5
# x = [1, 1]
# for i in range(2, 10):
#     x.append(x[-1] + x[-2])
# print(', '.join(str(y) for y in x))

# task6
# def findingCommon(list1, list2):
#     result = False
#     for x in list1:
#         for y in list2:
#             if x == y:
#                 result = True
#                 return result
# print(findingCommon([1, 2, 3, 4, 5], [5, 6, 7, 8, 9]))

# task7
# num_rows = 2
# num_cols = 3
# for i in range(num_rows):
#     print('*', end='')
#     for j in range(num_cols-1):
#         i *= j
#         print('*', end='')
#     print('')

# # task8
# def printRectangle(h, w):
#     for i in range(0, h):
#         print("")
#         for j in range(0, w):
#             if (i == 0 or i == h-1 or j == 0 or j == w-1):
#                 print("*", end="")
#             else:
#                 print(" ", end="")
# h = 4
# w = 5
# printRectangle(h, w)

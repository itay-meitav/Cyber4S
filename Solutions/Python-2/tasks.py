# Write a Python program to reverse a number. For the input 12649 you will get: 94621.
# task1
# number = int(input("Enter an integer number: "))
# print("The reverse number is: " + str(number)[::-1])


# Define a function in Python that accepts a list of numbers and returns their maximum.
# task2
# list = list(input("Enter a list of numbers: "))
# print("max number is: ", max(list))

# Write a Python program that sorts a dictionary by its values (Ascending or Descending).
# task3
# person = {'name': 'Michael', 'age': '25', 'location': 'Tel Aviv'}
# sorted_values = sorted(person.values())
# sorted_dict = {}

# for i in sorted_values:
#     for k in person.keys():
#         if person[k] == i:
#             sorted_dict[k] = person[k]
#             break

# print(sorted_dict)

# Write a Python program that sorts a list of objects by one of the object's fields (Ascending or Descending).
# task4
# employees = [
#     {'Name': 'Alan Turing', 'age': 25, 'salary': 10000},
#     {'Name': 'Sharon Lin', 'age': 30, 'salary': 8000},
#     {'Name': 'John Hopkins', 'age': 18, 'salary': 1000},
#     {'Name': 'Mikhail Tal', 'age': 40, 'salary': 15000},
# ]


# def get_name(person):
#     return person.get('Name')


# employees.sort(key=get_name)
# print(employees)

# Write a Python function that accepts a string and calculates the number of upper case letters and lower case letters.
# task5
# str = str(input("Enter a word: "))
# print("number of upper case: ", sum(1 for u in str if u.isupper()))
# print("number of lower case: ", sum(1 for l in str if l.islower()))

# Write a function that takes an ordered list of numbers (a list where the elements are in order from smallest to largest) and another number.
#  The function decides whether or not the given number is inside the list and returns (then prints) an appropriate boolean.
# task6
# def checkNumber():
#     list = [1, 2, 3, 4, 5, 6, 7]
#     number = int(input("Enter a number to check: "))
#     if number in list:
#         return True
#     return False


# if checkNumber() == True:
#     print("exist")
# else:
#     print("not exist")

# Write a Python program to find numbers within a given range where every number is divisible by every digit it contains.
# task7

# range_input = input("Enter a range: ").split()


# def isDivisible(start: int, end: int):
#     return [n for n in range(start, end + 1)
#             if all(map(lambda x: not (int(x) == 0 or n % int(x) != 0), str(n)))]
#     # if not any(map(lambda x: (int(x) == 0 or n % int(x) != 0), str(n)))]
#     # (all not like this) is same as saying (not some is like this)


# print(isDivisible(int(range_input[0]), int(range_input[1])))

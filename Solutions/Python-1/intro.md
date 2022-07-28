# Python

Python is one of the most popular programming languages, often used for data analytics and machine learning applications. 

## What is Python?
Python is a general-purpose, high-level, interpreted, object-oriented programming language used for a wide variety of applications.

Python emphasizes code readability with its use of significant indentation.
In addition, it includes high-level data structures, dynamic typing, dynamic binding, and many more features that make it very attractive for rapid application development.

### Resources
- YouTube (4 min): [What is Python](https://www.youtube.com/watch?v=Y8Tko2YC5hA)

## Install Python

Check if you have a version installed:
```
python --version
```

If you don't have python run the installation:
```
sudo apt-get install python3
```

## Create Your First Python Program

Let’s begin with a simple `Hello World`.

#### To execute python commands directly from the terminal:
- Type `python` in the terminal to run Python interactively. It will invoke the interpreter in immediate mode.
- Execute the following code:
  ```py
  print('Hello, World')
  ```
- To exit the interactive mode, press `ctrl+d` or type `quit()`.

#### To execute a python file:
- Create a new file named `hello.py`.
- To print "Hello World" add the following code in the file:
  ```py
  print('Hello, World')
  ```
- To execute the file, run from the terminal:
  ```
  python3 hello.py
  ```

## Syntax and Indentation in Python

### Using Blank Lines in code
Python ignores blank lines (lines with white spaces or comments).

### Indentation
Python indentation tells a Python interpreter that the group of statements belongs to a particular block of code. The indentation makes the code look neat, clean, and more readable.

A block is a combination of all the multiple statements. Inside a code block, we group multiple statements for a specific purpose.

In other programming languages like C or Java, use curly braces `{}` to define a block of code while Python uses indentation.

Whitespace is used for indentation in Python to define the indentation level. Ideally, we should use 4 spaces per indentation level. In Python, indented code blocks are always preceded by a colon `:` on the previous line.

In the following if-else statement:
```py
a = 50
b = 100
if a > b:
    print(a, 'is greater than', b)
elif b > a:
    print(b, 'is greater than', a)
else:
    print('Both numbers are equal')
```

If one code block is nested in another block, the child code block should be separated by 4 spaces from the parent code block.

If a block has to be more deeply nested, it is simply indented further to the right:
```py
a = 500
if a > 100:
    if a % 2 == 0:
        print('Even number is greater than 100')
```

### Resources
- The [Style Guide for Python Code](https://peps.python.org/pep-0008/)

## Python statements
A statement is an instruction that a Python interpreter can execute.

Python statements end with the NEWLINE character (`\n`). It means each line in a Python script is a statement.

There are mainly four types of statements in Python:
- Print statements
- Assignment statements
- Conditional statements
- Loop statements

### End-of-Line terminates a statement
Unlike other programming languages (in Java and C, the statement must end with a semicolon `;`), in Python the end of the line terminates the statement. No need to add symbols to mark the end of the statement.

### Multi-line statements

We can extend the statement over multiple lines using the line continuation character (`\`). This is known as an explicit continuation.
```py
calcRes = 10 + 20 + \
          30 + 40 + \
          50 + 60 + 70
print(calcRes)
```

### Implicit continuation

We can also use parentheses `()` to write a multi-line statement. Whatever we add inside parentheses `()` will be treated as a single statement although it is placed upon multiple lines.

```py
calcRes = (10 + 20 +
           30 + 40 +
           50 + 60 + 70)
print(addicalcRestion)
```

We can use square brackets `[]` to create a list. Then, if required, we can place each list item on a single line for better readability.

We can use curly brackets `{}` to create a dictionary with key-value pairs - each one on a new line for better readability.

```py
names = ['Emma',
         'Kelly',
         'Jessa']
print(names)

# dictionary: string:int
students = {'Emma': 70,
            'Kelly': 65,
            'Jessa': 75}
print(students)
```

### Semicolon to Seperate Multiple Statements
We can add multiple statements on a single line separated by semicolons, as follows:

```py
# Two statements in a single line
a = 5; b = 3
print('Sum: ', a + b)
```

## Simple statements

### Expression statement
An expression statement evaluates the expression list and calculates the value.

We assign an expression to a variable, which becomes a statement for an interpreter to execute:
```py
x = x + 10
```

### The pass statement
`pass` is a null operation, nothing happens when it executes. It is useful as a placeholder when a statement is required, but no code needs to be executed.

```py
def func1(arg):
    pass  # a function that does nothing (yet)
```

### The del statement
The `del` statement is used to delete objects/variables:  
`del target_list`

Once the variable is deleted, we can’t access it.
```py
a = 10
b = 30
print(a, b)
# delete x and y
del a, b
# try to access it
print(a, b)
```

### The return statement
Using a return statement, we can return a value from a function we called.

```py
# Define a function
def sum(num1, num2):
    return num1 + num2

result = sum(10, 20)
print(result)
```

## Python comments

In Python, we use the hash `#` symbol to start writing a comment. The comment begins with a hash sign and a whitespace character and continues until the end of the line.

There is no special option to write a multi-line comment. We just need to use a hash sign at the beginning of each line.
```py
# This is the first comment line
# and this is the second.
```

### Inline Comments
Inline comments should be separated by at least two spaces from the statement and start with a `#` sign and a single space:
```py
days = 5 * weeks  # calculate work days
```

## Keywords

Python keywords are reserved words that have a special meaning associated with them and can't be used for anything else.

Python keywords are case-sensitive.

- All keywords contain only letters (no special symbols)
- Except for three keywords (`True`, `False`, `None`), all keywords have lower case letters

To see all the defined keywords:
```py
import keyword
print(keyword.kwlist)
```

We will get:
```py
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

We will further explore the different keywords in later sections.

## Variables
Python is dynamically typed, hence there is no need to declare a variable before using it or declare the data type of variable. The declaration happens automatically when we assign a value to the variable.

```py
name = "Ellis"  # string
age = 25  # integer
```

### Variable’s case-sensitive
Python is a case-sensitive language. If we define two variables with as `a = 100` and `A = 200`, they are treated as two different variables.

### Changing the value of a variable
Many programming languages are statically typed where the variable is initially declared with a specific type.

Since in Python, the variables are dynamically typed, they are not subject to the data type restriction. A variable may be assigned to a value of one type, and later, we can re-assign it a value with a different type.

```py
# assign an integer
var = 10
print(var)  # 10
print(type(var))  # <class 'int'>

# change var to string
var = "Now I'm a string"
print(var)  # Now I'm a string
print(type(var))  # <class 'str'>

# assign a floating point
var = 35.69
print(var)  # 35.69
print(type(var))  # <class 'float'>
```

## Data types

There are four types of primitive data types available in Python:
- Numeric: int, float, and complex
- Sequence: String, list, and tuple
- Set
- Dictionary (dict)

### Numeric data types

### int
The `int` data type that returns integer type values (signed integers). The integer value can be positive or negative without a decimal point.

### float
The floats data type store decimal point values, dividing the integer and the fractional parts of the number.

### complex
Numbers with real and imaginary part. A complex number is in the form of `a+bj`, where a and b contain integers or floating-point values.

```py
age = 28
print(type(age))  # <class 'int'>
price = 230.90
print(type(salary))  # <class 'float'>
a = 3 + 5j
print(type(a))  # <class 'complex'>
```

### Sequence data types

### String

Python allows us to define a string in either pair of single or double quotation marks.

To retrieve a character from a given string, we can use the slice operator `[]` or `[:]`. Slicing provides us the subset of a string with an index starting from `0` to `end-1`.

To concatenate the string, we can use the `+` operator.
```py
str = 'Python'
print(str)  # Python

# print the first character
print(str[0])  # P

# print the characters from 2nd to 5th
print(str[2:5])  # tho

# length of string
print(len(str))  # 6

# concatenate strings
print(str + "Hello")  # PythonHello
```

### List

If we want to represent a group of elements (or value) as a single entity, we use the list data type.

Characteristics:
1) The insertion order of elements is preserved.
2) The list can be heterogeneous - all data types (int, float, string) are allowed.
3) Duplicate elements are permitted.
4) The list is mutable (can change).
5) The list is growable (we can increase or decrease the list’s size).
6) The list can be accessed with positive or negative indexes (negative are from the end).
7) List elements should be enclosed within square brackets [].

```py
my_list = ['Michael', 10, 20, 'Kelly', 50, 10.5]
print(my_list)  # ['Michael', 10, 20, 'Kelly', 50, 10.5]

# access first element
print(my_list[0])  # 'Michael'

# access last element
print(my_list[-1])  # 10.5

# access a few elements
print(my_list[1:3])  # [10, 20]

# modify first element
my_list[0] = 'Emma'
print(my_list[0])  # 'Emma'

# add one more element
my_list.append(100)
print(my_list)  # ['Emma', 10, 20, 'Kelly', 50, 10.5, 100]

# remove all elements
my_list.clear()

# remove element by value
my_list.remove(10)
```

### tuple
Tuples are ordered collections of elements that cannot be changed. We can say a tuple is a read-only version of the list.

For example, if we need to store the IDs of students (they don’t change), we can use the tuple data type.
```py
# create a tuple
my_tuple = (11, 24, 56, 88, 78)
print(my_tuple)  # (11, 24, 56, 88, 78)
print(type(my_tuple))  # class 'tuple'

# Accessing 3rd element of a tuple
print(my_tuple[2])  # 56

# slice a tuple
print(my_tuple[2:7])  # (56, 88, 78)

# modify 2nd element of tuple
my_tuple[1] = 35
print(my_tuple)  # TypeError: 'tuple' object does not support item assignment
```

### Dict data type
In Python, dictionaries are collections of unique values stored in Key-Value pairs.
The values are ordered by insertion order (as of python 3.7+).
The dictionary data type is represented using a dict class.

Duplicate keys are not allowed in the dictionary. Note, that the value can be duplicated between different keys. If we try to insert a value with a duplicate key, it will override the previous value.

Characteristics:
1) A heterogeneous (i.e., str, list, tuple) elements are allowed for both key and value in a dictionary. An object can be a key in a dictionary if it is hashable.
2) The dictionary is mutable which means we can modify its items.
3) Dictionary items are ordered by insertion order.

```py
# Method 1 - create a dictionary
my_dict = {1: "Emma", 2: "John", 3: "Becky"}

print(my_dict)  # {1: 'Emma', 2: 'John', 3: 'Becky'}
print(type(my_dict))  # class 'dict'

# Method 2 - create a dictionary
my_dict = dict({1: "Emma", 2: "John", 3: "Becky"})

print(my_dict)  # {1: 'Emma', 2: 'John', 3: 'Becky'}
print(type(my_dict))  # class 'dict'

# access value using a key name
print(my_dict[1])  # Emma

# change the value
my_dict[1] = "Kelly"
print(my_dict[1])  # Kelly
```

### Set data type
Python Set is an unordered collection of elements (Or objects) that contains no duplicate items.

In Python, the Set data type used to represent a group of unique elements as a single entity. For example, If we want to store student ID numbers, we can use the set data type.

Characteristics:
1) Set is mutable - we can change set items
2) Duplicate elements are not allowed
3) Heterogeneous (values of all data types) elements are allowed
4) Insertion order of elements is not preserved (unordered)

```py
# Method 1 - create a set using curly brackets
my_set = {100, 25.75, "John"}
print(my_set)  # {25.75, 'John', 100}
print(type(my_set))  # class 'set'

# Method 2 - create a set using set class
my_set = set({100, 25.75, "John"})
print(my_set)  # {25.75, 'John', 100}
print(type(my_set))  # class 'set'

# add element to set
my_set.add(300)
print(my_set)  # {25.75, 'John', 100, 300}

# remove element from set
my_set.remove(100)
print(my_set)  # {25.75, 'John', 300}
```

### Frozenset
The frozenset data type is used to create an immutable Set.
```py
# creating a frozenset
my_set = frozenset({100, 25.75, "John"})
my_set.add(300)  # Error
```

### Bool data type
Python boolean values - `True` and `False`.
```py
x = 25
y = 20
z = x > y
print(z)  # True
print(type(z))  # class 'bool'
```

## Constants

Constants are variables that do not change throughout the program execution.

The problem is that Python doesn’t support constants. To work around this, we use all capital letters to name a variable to indicate that the variable should be treated as a constant:
```py
FILE_SIZE_LIMIT = 2000
```

## Variables scope
Depending on the scope, variables can be either local or global.

### Local variables
A local variable is a variable that is accessible only inside the block of code it is declared in. If we declare a variable inside a method, the scope of the local variable is limited to the method only. If we try to access it, we will get an error.

### Global variables
A Global variable is a variable defined outside of a method (block of code). It is accessible anywhere in the code.

```py
price1 = 500  # Global variable

def test1():  # first function
    price2 = 900  # local variable
    print("price1 in test2 function: ", price1)  # 500
    print("price2 in test1 function: ", price2)  # 900

def test2():  # second function
    print("price1 in test2 function: ", price1)  # 500
    print("price2 in test2 function: ", price2)  # Error

# call functions
test1()
test2()
```

## Object/Variable identity and references

Each variable or object created in Python has an `id`, which we can get using the `id()` built-in function. It is guaranteed to be unique and constant for this object during its lifetime.

Note: in some python implementations, `id()` points to the address of the object in memory.

In the following example `a` and `b` have different ids, while `c` has the same id and therefore the same underlying value.
```py
a = 300
b = 400
c = a
print(id(a)) 
print(id(b))
print(id(c))  # same memory address as a
```

## Operators

![Operators](https://i.ibb.co/86GJj8N/operators.png)

## Type Conversion and Type Casting

Python performs the following two types of casting:
- Implicit casting: The Python interpreter automatically performs an implicit Type conversion, avoiding loss of data.
- Explicit casting: The explicit type conversion is performed by the user using built-in functions.

To perform a type casting, we are going to use the following built-in functions: `int()`, `float()`, `complex()`, `bool()`, `str()`.

Note, that in type casting, data loss may occur.

Some conversion examples:
1) When converting string to int, the string should represent an integer number.
2) We can convert any type to int and float, except complex.
3) When converting string to float, the string should contain an integer/decimal value of base-10.
4) We can convert any type to bool, and the output for all values will be True, Except 0 or empty string, which will be False.

```py
# converting float -> integer
num1 = int(3.14)
print(num1)  # 3
print(type(num1))  # class 'int'

# converting boolean -> integer
num2 = int(True)
print(num2)  # 1
print(type(num2))  # class 'int'

# converting bool -> str
s1 = str(False)
print(s1)  #  False
print(type(s1))  # class 'str'
```

## Conditional statements (if, elif, etc...)
The python syntax of `if-elif-else` is:
```py
if price < 10:
    print("Cash only")
elif 10 <= price < 500:
    print("Credit and cash")
else:
    print("Credit only")
```

The if statement can also be written without blocks:
```py
number = 56
if number > 0: print("positive")
else: print("negative")
```

## For loop
The for loop executes a finite number of times. In the following example `i` indicates the iteration index, and `range()` returns a sequence of numbers from 0 to 4: 
```py
sum = 0
for i in range(5):
    sum = sum + i
print(sum)  # 10
```
In the following example the `range` is more complex:
```py
sum = 0
for i in range(2, 10, 2):
    sum = sum + i
print(sum)  # 20
```

### For loop on list
Get the average from the list:
```py
numbers = [10, 20, 30, 40, 50]

sum = 0
for i in numbers:
    sum = sum + i
average = sum / len(numbers)
print(average)
```

### break, continue and pass
When the `break` statement is executed, Python stops the current loop, and the control flow is transferred to the following line of code immediately after the loop.

The `continue` statement skips the current iteration of the loop and immediately jumps to the next iteration.

The `pass` statement is an empty statement, nothing happens when the statement is executed.

```py
numbers = [1, 4, 7, 8, 15, 20, 35, 45, 55]
for i in numbers:
    if i > 15:
        break
    elif i < 0:
        continue
    else:
        pass
```

### Else block in for loop
Same as the if statement, Python allows us to use an else statement along with the for loop. In Python, the else block after a for loop will be executed when the loop terminates normally.

The else part of the for loop is optional.

Done will be printed after the loop finished the iteration:
```py
for i in range(1, 6):
    print(i)
else:
    print("Done")
```

If we had a break in the loop, and it didn't finish its full execution, else wouldn't be executed.

### Accessing the index in for loop
The `enumerate()` function is useful when we need to access both the value and the index of the list item.
```py
numbers = [4, 2, 5, 7, 8]
for i, v in enumerate(numbers):
    print('numbers[', i, '] =', v)
```

### Iterate String using for loop
```py
name = "Michael"
for i in name:
    print(i + ' ')
# In reversed order
for i in name[::-1]:
    print(i + ' ')
```

### Iterate a dictionary
```py
# Key and value
car_dict = {"Brand": "BMW", "Color": "Black", "Date": 1964}
for key in car_dict:
    print(key, "->", car_dict[key])
# Values only
for value in car_dict.values():
    print(value)
```

## Resources

* YouTube (1:35): [Python Crash Course For Beginners
](https://www.youtube.com/watch?v=JJmcL1N2KQs)
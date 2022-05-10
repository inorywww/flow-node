# python学习笔记

## day1

### 字符串常用方法

isalnum() 字符串全为数字+字符，true

isalpha()字符串全为数字或者全为字符，true

isdigit()字符串全为数字，true

lstrip()删除左边的空格

rstrip()删除右边空格

split()	截取

## day2

### 列表 List

### 相当于数组，可以存放任意类型的元素

l[-1] //表示该列表最后一个元素

#### 增加：

l.append() //在末尾添加,可以整体添加List

l.extend() //在末尾添加,可以逐一添加List

l.insert(1,"x") //指定下标插入,将x放在第1个位置

#### 删除

del list[2] //删除指定位置元素

l.pop() //删除末尾元素

l.remove("str") //删除指定内容（第一个）

#### 查

in 或者 not in //在或不在

str in list

l.index("x",1,4) //在[1,4)之中查找x 返回下标

l.count("x") //计算x的出现次数

a.reverse() //反转

a.sort() //排序

enumerate(list) # 枚举函数，同时获取下标和元素

## day3

### 元组 tuple

tup=()

tup1=(2,)//加逗号

元组不能直接增加和修改，只能通过tup2=tup0+tup1进行增加

元组不能删除某个元素，只能删除整个元组

元组也是通过[]访问元素

### 字典 dict

dict={"name":"lucy","age":18}

#### 读取

dict["name"] dict.get("name")

#### 增加：

dict["ID"]=114514

#### 删除

del dict["name"]

clear dict

#### 修改

dict["name"]="mike"

#### 查询

dict.keys() dict.values() dict.items()

### 函数

def name():
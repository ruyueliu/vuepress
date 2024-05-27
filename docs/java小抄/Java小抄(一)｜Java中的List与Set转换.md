---
title: Java小抄(一)｜Java中的List与Set转换
date: 2024-05-27
---
<!-- TOC -->
* [List和Set的区别](#list和set的区别)
* [线程安全的区别](#线程安全的区别)
* [相互转换](#相互转换)
  * [List->Set](#list---set)
  * [Set->List](#set---list)
<!-- TOC -->
# List和Set的区别
在Java中，List和Set都是集合接口，它们之间有几个关键的区别：

1.  **重复元素：**
- List允许重复元素，可以存储相同的元素多次。
- Set不允许重复元素，每个元素在Set中是唯一的。
2.  **元素的顺序：**
- List是有序集合，它按照元素插入的顺序来维护元素的顺序。
- Set通常不保证元素的顺序。具体而言，HashSet不保证元素的顺序，而TreeSet按照元素的自然顺序或者通过提供的Comparator来排序元素。
3.  **实现类：**
- List的常见实现类有ArrayList、LinkedList和Vector。
- Set的常见实现类有HashSet、TreeSet和LinkedHashSet。
4.  **性能：**
- List的实现类通常提供了快速的随机访问（根据索引访问元素），但在插入和删除操作时，ArrayList的性能较好，因为它不需要像LinkedList那样改变指针。
- Set的实现类通常旨在提供快速的查找和插入操作，因此HashSet通常比TreeSet快，但是TreeSet可以保证元素的有序性。

在选择使用List还是Set时，你需要考虑你的数据结构的特性以及对性能和元素唯一性的需求。
# 线程安全的区别
在线程安全方面，List和Set之间也有一些区别：

1.  **List的线程安全性：**
- Java中的ArrayList和LinkedList不是线程安全的，它们在多线程环境下不是安全的，如果多个线程同时修改一个List实例，可能会导致不确定的结果或者抛出ConcurrentModificationException异常。
- Vector是List的线程安全实现类，它通过在每个方法上添加synchronized关键字来确保线程安全。
2.  **Set的线程安全性：**
- HashSet和TreeSet都不是线程安全的，它们在多线程环境下可能会导致不确定的结果或者抛出ConcurrentModificationException异常。
- LinkedHashSet也不是线程安全的。
3.  **线程安全的替代方案：**
- 如果需要在多线程环境下使用List或Set，可以考虑使用它们的线程安全实现类。例如，可以使用Collections类中的synchronizedList方法来获得一个线程安全的List，或者使用CopyOnWriteArrayList等并发集合类。
- 如果需要在多线程环境下使用Set，可以考虑使用ConcurrentHashMap作为替代方案，或者使用ConcurrentSkipListSet。

总的来说，在多线程环境下，需要注意List和Set的线程安全性，并选择合适的线程安全实现类或并发集合类来确保线程安全。
# 相互转换
##  List->Set
在Java中，将List转换为Set可以通过以下几种方式实现：

1.  **使用构造函数：**
```java
List<String> list = new ArrayList<>();
// 添加元素到列表

Set<String> set = new HashSet<>(list); // 使用HashSet构造函数
```

2.  **使用addAll()方法：**
```java
List<String> list = new ArrayList<>();
// 添加元素到列表

Set<String> set = new HashSet<>();
set.addAll(list);
```

3.  **Java 8 Stream API：**
```java
List<String> list = new ArrayList<>();
// 添加元素到列表

Set<String> set = list.stream().collect(Collectors.toSet());
```

4.  **Apache Commons Collections：**
    如果你使用Apache Commons Collections库，你可以使用ListUtils类中的方法：
```java
List<String> list = new ArrayList<>();
// 添加元素到列表

Set<String> set = new HashSet<>(ListUtils.intersection(list, list)); // 使用ListUtils.intersection()方法
```
无论选择哪种方式，都可以将List转换为Set。注意，在转换过程中，如果List中包含重复元素，转换后的Set将只包含唯一的元素。
## Set->List
在Java中，将Set转换为List也有几种实现方式：

1.  **使用构造函数：**
```java
Set<String> set = new HashSet<>();
// 添加元素到集合

List<String> list = new ArrayList<>(set); // 使用ArrayList构造函数
```

2.  **使用addAll()方法：**
```java
Set<String> set = new HashSet<>();
// 添加元素到集合

List<String> list = new ArrayList<>();
list.addAll(set);
```

3.  **Java 8 Stream API：**
```java
Set<String> set = new HashSet<>();
// 添加元素到集合

List<String> list = set.stream().collect(Collectors.toList());
```

4.  **Apache Commons Collections：**
    如果你使用Apache Commons Collections库，你可以使用SetUtils类中的方法：
```java
Set<String> set = new HashSet<>();
// 添加元素到集合

List<String> list = new ArrayList<>(SetUtils.orderedSetToList(set)); // 使用SetUtils.orderedSetToList()方法
```
以上是一些常见的将Set转换为List的方法。在转换过程中，Set中的元素顺序可能会改变，因为List是有序集合，而Set通常是无序的。

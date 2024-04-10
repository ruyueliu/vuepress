---
title: java(5)|Java 中 throw 与 throws 的区别是什么？
date: 2024-03-07
---
在Java中，`throw`和`throws`是两个关键字，它们用于异常处理，但在语法和作用上有所不同：

1.  `throw`：
- `throw` 关键字用于在代码块中抛出一个异常对象。
- 当某个条件发生时，你可以使用 `throw` 关键字手动抛出一个异常，使程序进入异常处理流程。
- 通常情况下，`throw` 后面会跟着一个异常对象的实例化，如 `throw new Exception();`。
- 例如：
```java
if (x < 0) {
    throw new IllegalArgumentException("x不能为负数");
}
```


2.  `throws`：
- `throws` 关键字用于在方法签名中声明方法可能抛出的异常。
- 当你调用一个可能会抛出异常的方法时，你必须要么在方法内部捕获这个异常，要么在方法签名中使用 `throws` 声明该异常。
- `throws` 关键字用于告诉调用者这个方法可能会抛出指定类型的异常，以便调用者在调用方法时可以进行相应的异常处理。
- 例如：
```java
public void readFile() throws IOException {
    // 读取文件的代码
}
```

总结：

- `throw` 用于在代码块内部抛出异常。
- `throws` 用于在方法签名中声明方法可能抛出的异常，以便调用者做相应的处理。

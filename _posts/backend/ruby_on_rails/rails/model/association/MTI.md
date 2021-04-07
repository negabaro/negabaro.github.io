What is Multiple Table Inheritance
Multiple table inheritance (MTI) is defined as each subclass having its own table, but shares common behavior through a common parent class. For example, let’s re-model our accounts with MTI.


When To Use Multiple Table Inheritance
Use MTI When The Subclasses Have Vastly Different Fields/Columns But Share Common Behavior
When subclasses have vastly different fields/columns, placing them all in a single table will have a lot of null columns, which is ultimately a waste of space, conceptually confusing, and reduces the effectiveness of indices. For example, modeling animals with STI would be a bad choice.


https://medium.com/@User3141592/when-to-use-single-table-inheritance-vs-multiple-table-inheritance-db7e9733ae2e
# EksiArchive

---

Eksi sozluk entrylerinin local kopyasini alin.

Kullanici entry sayfasi, kullanici veya entry arsivleyebilir. 


#### Example Output - Ornek Cikti

- Single Entry

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -e https://eksisozluk.com/entry/110993125
arsivlenecek entry: 110993125
entry '110993125' suresi: 569.63ms
ok. entry arsivlendi

tfp@mint:~/Programming/node/EksiArchive$ node main.js -e https://eksisozluk.com/entry/110896726
arsivlenecek entry: 110896726
entry '110896726' suresi: 470.598ms
ok. entry arsivlendi

tfp@mint:~/Programming/node/EksiArchive$ node main.js -e https://eksisozluk.com/entry/110701925
arsivlenecek entry: 110701925
entry '110701925' suresi: 530.469ms
ok. entry arsivlendi
```

- Page with already archived entries

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -p divit,16
arsivlenecek sayfa: divit,16
'110993125' - entry zaten arsivde
entry '110968455' suresi: 427.611ms
entry '111008488' suresi: 438.36ms
entry '110974110' suresi: 445.372ms
entry '110969141' suresi: 466.381ms
'110896726' - entry zaten arsivde
entry '110948487' suresi: 365.646ms
entry '110939703' suresi: 413.026ms

...

entry '110750660' suresi: 449.359ms
entry '110754564' suresi: 476.247ms
'110701925' - entry zaten arsivde
entry '110713263' suresi: 379.106ms
entry '110726041' suresi: 427.007ms
entry '110730959' suresi: 483.798ms
entry '110677047' suresi: 540.98ms

...

entry '110399945' suresi: 431.179ms
entry '110344156' suresi: 435.541ms
entry '110370235' suresi: 485.536ms
kullanici: 'divit', sayfa: '16': 5.423s
ok. sayfadaki tum entryler arsivlendi
tfp@mint:~/Programming/node/EksiArchive$ 
```
---

##### Page archive format

first

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -p 'dandik tavsan,1'
arsivlenecek sayfa: dandik tavsan,1
entry '128948365': 387.162ms
entry '128960372': 425.493ms
entry '128959063': 427.208ms

...

entry '128604430': 436.523ms
entry '128605961': 507.276ms
kullanici: 'dandik-tavsan', sayfa: '1': 5.417s
ok. sayfadaki tum entryler arsivlendi
```

second

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -p 'dandik-tavsan,1'
arsivlenecek sayfa: dandik-tavsan,1
'128960372' - entry zaten arsivde
'128960020' - entry zaten arsivde
'128960905' - entry zaten arsivde

...

kullanici: 'dandik-tavsan', sayfa: '1': 489.027ms
ok. sayfadaki tum entryler arsivlendi

```

third

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -p dandik-tavsan,1
arsivlenecek sayfa: dandik-tavsan,1
'128960905' - entry zaten arsivde
'128959063' - entry zaten arsivde

...

kullanici: 'dandik-tavsan', sayfa: '1': 427.811ms
ok. sayfadaki tum entryler arsivlendi
```

---

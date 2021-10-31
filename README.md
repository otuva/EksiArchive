# EksiArchive

---

Eksi sozluk entrylerinin local kopyasini alin.

Kullanici entry sayfasi, kullanici veya entry arsivleyebilir.

Internet hizina bagli olarak dakikada +2500 entry arsivleyebilir. 


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

force

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js --force -e https://eksisozluk.com/entry/129197723
arsivlenecek entry: 129197723
entry zaten arsivde ama "--force" secenegi kullanildi
[Tue, 19 Oct 2021 06:27:56 GMT] - entry '129197723': 556.462ms
ok. entry arsivlendi
```

debe


```
tfp@mint:~/Programming/node/EksiArchive$ node main.js debe
[Tue, 19 Oct 2021 06:38:28 GMT] - entry '129191337': 393.517ms
[Tue, 19 Oct 2021 06:38:28 GMT] - entry '129174033': 452.927ms
[Tue, 19 Oct 2021 06:38:28 GMT] - entry '129179649': 461.026ms
[Tue, 19 Oct 2021 06:38:28 GMT] - entry '129189529': 482.283ms
[Tue, 19 Oct 2021 06:38:28 GMT] - entry '129180581': 484.936ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129200450': 421.462ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129180769': 427.666ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129203709': 486.857ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129179989': 529.228ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129178534': 542.361ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129195725': 421.65ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129190573': 458.791ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129173753': 475.581ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129174426': 479.021ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129195435': 479.583ms
[Tue, 19 Oct 2021 06:38:29 GMT] - entry '129197743': 429.423ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129179610': 401.376ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129183635': 433.705ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129179477': 437.044ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129180339': 427.31ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129200095': 399.411ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129201876': 409.159ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129181201': 470.406ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129190781': 472.747ms
[Tue, 19 Oct 2021 06:38:30 GMT] - entry '129181340': 577.091ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129190673': 460.169ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129173711': 462.477ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129188223': 469.583ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129179172': 479.141ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129189933': 552.604ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129201312': 443.169ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129187968': 449.41ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129191260': 490.153ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129204768': 494.202ms
[Tue, 19 Oct 2021 06:38:31 GMT] - entry '129200973': 502.019ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129175557': 427.35ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129202710': 446.452ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129200037': 473.432ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129184664': 480.234ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129202876': 537.625ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129179633': 452.197ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129181487': 474.263ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129188578': 491.497ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129184361': 494.781ms
[Tue, 19 Oct 2021 06:38:32 GMT] - entry '129182220': 530.248ms
[Tue, 19 Oct 2021 06:38:33 GMT] - entry '129205939': 415.732ms
[Tue, 19 Oct 2021 06:38:33 GMT] - entry '129184484': 455.15ms
/debe: 5.539s
```

sleep

```
tfp@mint:~/Programming/node/EksiArchive$ node main.js -e https://eksisozluk.com/entry/129214458 --sleep 5000
arsivlenecek entry: 129214458
[Tue, 19 Oct 2021 06:55:40 GMT] - entry '129214458': 5.657s
ok. entry arsivlendi
```

---

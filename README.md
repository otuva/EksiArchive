# EksiArchive

---

Eksi sozluk entrylerinin local kopyasini alin.


#### Example Output - Ornek Cikti
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
entry '110888405' suresi: 435.788ms
entry '110894967' suresi: 446.091ms
entry '110867901' suresi: 413.002ms
entry '110807397' suresi: 418.334ms
entry '110880269' suresi: 425.245ms
entry '110884471' suresi: 427.225ms
entry '110828189' suresi: 526.966ms
entry '110777172' suresi: 440.486ms
entry '110753819' suresi: 442.559ms
entry '110795212' suresi: 451.528ms
entry '110750660' suresi: 449.359ms
entry '110754564' suresi: 476.247ms
'110701925' - entry zaten arsivde
entry '110713263' suresi: 379.106ms
entry '110726041' suresi: 427.007ms
entry '110730959' suresi: 483.798ms
entry '110677047' suresi: 540.98ms
entry '110608957' suresi: 401.026ms
entry '110633099' suresi: 425.812ms
entry '110666844' suresi: 430.737ms
entry '110607813' suresi: 432.142ms
entry '110624917' suresi: 441.459ms
entry '110535785' suresi: 415.667ms
entry '110596572' suresi: 424.239ms
entry '110519344' suresi: 426.356ms
entry '110544347' suresi: 434.396ms
entry '110512363' suresi: 445.111ms
entry '110512104' suresi: 414.768ms
entry '110464684' suresi: 484.161ms
entry '110463713' suresi: 495.52ms
entry '110493145' suresi: 502.979ms
entry '110487847' suresi: 520.861ms
entry '110449675' suresi: 394.219ms
entry '110433488' suresi: 416.354ms
entry '110430627' suresi: 426.335ms
entry '110439681' suresi: 449.988ms
entry '110430013' suresi: 532.152ms
entry '110357613' suresi: 379.759ms
entry '110370068' suresi: 429.38ms
entry '110399945' suresi: 431.179ms
entry '110344156' suresi: 435.541ms
entry '110370235' suresi: 485.536ms
kullanici: 'divit', sayfa: '16': 5.423s
ok. sayfadaki tum entryler arsivlendi
tfp@mint:~/Programming/node/EksiArchive$ 

```

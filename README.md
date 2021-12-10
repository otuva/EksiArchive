# EksiArchive

Eksi sozluk entrylerinin local kopyasini alin.

Kullanici entry sayfasi, kullanici veya entry arsivleyebilir.

Internet hizina bagli olarak dakikada +2500 entry arsivleyebilir. 

---

- # Kullanim 

  - ## Arsiv Kullanimi:

    * [AA]= 'AA' degeri opsiyonel

    ```
    -e, --entry        [https://eksisozluk.com/entry/]ENTRY_ID
    -u, --user         KULLANICI_ADI[,SAYFA]
    -f, --favorite     KULLANICI_ADI[,SAYFA]
    ```

  - ## Ayar Kullanimi:

    * Bu ayarlar opsiyonel.

    ```
    --sleep            MILISANIYE            Istekler arasinda bekleme suresi.
    --force            Arsivde olan entry'i tekrar arsivle.
    --threads          SAYI                  Paralel gidecek maksimum istek sayisi. (Default 5)
    ```

  - ## Ornekler 

    ```
    node main.js -e https://eksisozluk.com/entry/43434343
    node main.js -e 43434343
    node main.js --entry https://eksisozluk.com/entry/43434343
    node main.js --entry 43434343

    node main.js -u ssg  # tum entryleri arsivler
    node main.js -u ssg,3  # 3. entry sayfasini arsivler
    node main.js --user ssg,5  # 5. entry sayfasini arsivler

    node main.js -f ssg  # tum favorileri arsivler
    node main.js -f ssg,3  # 3. favori entry sayfasini arsivler
    node main.js --favorite ssg,5  # 5. entry sayfasini arsivler

    node main.js -e 555555 --sleep 5000  # 5 sn bekle ve entry '555555' arsivle
    node main.js -u ssg --sleep 5000  # sayfalari isle ve yenilerini atmadan once 5 sn bekle
    node main.js -e 555555 --force  # entry '555555' arsive ekle. eger arsivde varsa duplicate olarak ekle
    node main.js -u ssg --threads 3  # ayni anda max 3 tane request at. 3 tanesi tamamlanana kadar yeni requestler atma
    ```

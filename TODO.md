---

- kullanici favorilerini al
- baslik arsivleme (tamami ya da sayfa sayfa)
- entry icinde linklenen diger entryleri de al (ayar olarak ekle)
- hata donduren entryleri atla ama not al. diger tum entryler bitince onlari tekrar dene
- ayarlara max try ve maxtry flagi ekle. default 3
- random user agent secenegi olsun
- rate limiting icin belki proxy kullan. 5 port arasinda degisimli istekler at?
- loglari arttir ve renkli yap. (belki tum loglari tek fonksiyona bagla ve oradan renk ver)
- console.log olanlari info vs. degistir
- entrydeki gorselleri kaydet?
- belki db'e eklenme tarihi koy?
- readme ekle
- entryleri sunmak icin local server?
- server belki gui olarak da islev gorebilir
- get random entry to read 
- get random entry to read user specific 
- cli argument hatalarini yaz. multi lang olsun diye stringleri utilse koy.

---

#### gorseller???

- entryde gorseller varsa hashini al veya gorsel idsini db ile kiyasla yoksa ekle

---

### server

- entry eksisozlukte canli duruyor mu kontrol et
- gorselleri entrye ekle base64 olarak serv et 

---

### gereksiz seyler

- [ ] verbose seviyeleri icin sistem ekle
- [ ] outputlari renkli yap
- [ ] favorileyen kullanicilari ve caylaklari ayri al??
- [ ] fav kullanicilari db ekle??
- [ ] auth sistemi kur??????

--- 

# Done 

- [X] sql icin entry objesi isteyen entry ekleme fonk koy.
- [X] new linei ise br olarak ekle 
- [X] 3-5 tane entry bul tek tek dene
- [X] bos entry
- [X] belli bir htmlden entry objecti dondurur
- [X] entryde gordugu tum kisimlari alir 
- [X] entry savelemeden once var mi diye kontrol et
- [X] argument parser ekle
- [x] baslik bilgisi ekle database'e
- [X] kullanici arsiv fonksiyonu
- [X] sayfa arsiv fonksiyonu -> oncelikli
- [X] sleepi fonksiyon parametresi olarak cagirmaktansa confige ekle. flag gelirse configtekini guncelle
- [X] ayar dosyasi koy, user agent kismini oradan ayarla. 
- [X] entry icindeki html elementleri nolacak? (oldugu gibi kalacak)
- [X] debeyi oncelikli flag olarak ekle. debedeki tum entryleri arsivlesin
- [X] var olan entry --forcelanirsa guncel halini de al
- [X] hash almak yerine idyi kontrol et varsa kullanicidan arsivlemek icin --forcelamasini iste 
- [X] entrynin icerik hashini al. aynisi varsa direkt ekleme kullanici onayi iste. (hash yerine id ve argument ustu gittim.)
- [X] varolan bir entryi verip entry guncelleyebilsin. (--force. guncellemek yerine duplicate aliyor)

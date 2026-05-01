# BallisticsPro — مکمل استعمال گائیڈ
## Complete Usage Description

> **⚠️ تنبیہ / WARNING:**  
> یہ ایپلیکیشن صرف قانونی سیکورٹی اداروں، فوج، اور لائسنس یافتہ پیشہ ور نشانہ بازوں کے لیے بنائی گئی ہے۔  
> *This application is strictly intended for authorized security agencies, military personnel, and licensed professional shooters only.*

---

## 📱 اسکرین شاٹس / Screenshots

### Screenshot 1 — ماحولیاتی ڈیٹا ان پٹ
![Main Input Form](screenshots/screenshot_1_main_form.png)

**جو ہو رہا ہے:** صارف ماحولیاتی حالات (ہوا کی رفتار، درجہ حرارت، بارش وغیرہ) اور رائفل پروفائل داخل کر رہا ہے۔

---

### Screenshot 2 — رائفل پروفائل کا انتخاب
![Rifle Profile Selection](screenshots/screenshot_2_rifle_profile.png)

**جو ہو رہا ہے:** POF Azb پروفائل منتخب کی گئی۔ رائفل کی مکمل بیلسٹک معلومات خودبخود بھر گئیں (کیلیبر: 7.62×51mm NATO، گولی کا وزن: 175 grains، G7 BC: 0.243، رفتار: 800 m/s)۔

---

### Screenshot 3 — فائرنگ سلوشن کا حساب
![Firing Solution](screenshots/screenshot_3_firing_solution.png)

**جو ہو رہا ہے:** "Calculate Solution" بٹن دبانے کے بعد ایپ نے فوری طور پر:
- Advisory (NO-SHOOT / WAIT / SHOOT) دکھائی
- Elevation Correction: **69.95 MOA**
- Windage Correction: **239.25 MOA**
- Total Bullet Drop: **3911 cm**
- Time of Flight: **3.56 seconds**

---

### Screenshot 4 — مکمل نتائج اسکرین
![Full Results](screenshots/screenshot_4_results.png)

**جو ہو رہا ہے:** تمام بیلسٹک نتائج اسکرین پر واضح طور پر نظر آ رہے ہیں — Elevation، Windage، Bullet Drop، اور Time of Flight — MOA/MRAD/Clicks میں قابل تبدیل۔

---

## 📋 ایپ کے فیچرز کی مکمل فہرست
## Complete Features List

### 🌡️ ماحولیاتی ان پٹس / Environmental Inputs
| فیچر | تفصیل |
|------|--------|
| Wind Speed | ہوا کی رفتار (km/h) |
| Wind Direction | ہوا کی سمت (0-360 degrees) |
| Humidity | نمی (%) |
| Temperature | درجہ حرارت (°C) |
| Barometric Pressure | ہوا کا دباؤ (mbar) |
| Altitude | بلندی سطح سمندر سے (meters) |
| Rain Intensity | بارش کی شدت (0-10 اسکیل) |

### 🔫 رائفل پروفائل / Rifle Profile
| فیچر | تفصیل |
|------|--------|
| 10 World Rifles | دنیا کی 10 بہترین سنائپر رائفلز |
| 8 Pakistan Rifles | پاکستانی فوج کی 8 رائفلز (POF Azb، POF PSR-90، SSG 69 وغیرہ) |
| Custom Profiles | اپنی رائفل کا پروفائل محفوظ کریں |
| Bullet Weight | گولی کا وزن (grains) |
| G7 BC | بیلسٹک کوایفیشینٹ |
| Muzzle Velocity | تھوتھنی کی رفتار (m/s) |

### 🎯 فائرنگ سلوشن / Firing Solution Output
| آؤٹ پٹ | یونٹس |
|--------|-------|
| Elevation Correction | MOA / MRAD / Clicks / Inches / CM |
| Windage Correction | MOA / MRAD / Clicks / Inches / CM |
| Total Bullet Drop | Centimeters |
| Time of Flight | Seconds |
| Terminal Energy | Joules |
| Shot Confidence | 0–100% |
| Advisory | SHOOT 🟢 / WAIT 🟡 / NO-SHOOT 🔴 |

### 🔭 AR سنائپر اسکوپ / AR Sniper Scope
- موبائل کیمرے کے ذریعے لائیو ویڈیو فیڈ
- Mil-Dot کراس ہیئر اوور لے
- **سرخ Holdover Dot** جو بیلسٹک کیلکولیشن کے مطابق حرکت کرتا ہے
- HUD پر ELEV، WIND، TOF، ENERGY، CONFIDENCE دکھاتا ہے

### ⚙️ دیگر فیچرز / Other Features
| فیچر | تفصیل |
|------|--------|
| Night Mode (Red Screen) | رات کی بینائی کے لیے سرخ اسکرین |
| Urdu / English Toggle | اردو اور انگریزی زبان کا ٹوگل |
| Offline Operation | بغیر انٹرنیٹ مکمل کام |
| PDF Range Card Export | پرنٹ کے ذریعے رینج کارڈ محفوظ کریں |
| Profile Storage | مقامی ڈیوائس پر پروفائل محفوظ |

---

## 🚀 استعمال کا طریقہ / How to Use (Step by Step)

### مرحلہ 1: ماحولیاتی ڈیٹا داخل کریں
1. ایپ کھولیں
2. "Environmental Conditions" سیکشن میں:
   - **Wind Speed:** ہوا کی موجودہ رفتار km/h میں
   - **Wind Direction:** ہوا کی سمت (0° = شمال، 90° = مشرق)
   - **Temperature:** موجودہ درجہ حرارت °C میں
   - **Pressure:** بیرومیٹرک دباؤ (ڈیفالٹ 1013 mbar)
   - **Altitude:** آپ کی موجودہ بلندی میٹرز میں
   - **Rain:** بارش کی شدت 0 (بالکل نہیں) سے 10 (شدید)

### مرحلہ 2: رائفل پروفائل منتخب کریں
1. "Rifle & Ammo Profile" سیکشن میں dropdown کھولیں
2. اپنی رائفل منتخب کریں:
   - **🌍 World Top 10** — دنیا کی مشہور سنائپر رائفلز
   - **🇵🇰 Pakistan Army / SSG Rifles** — پاکستانی فوجی رائفلز
3. منتخب کرتے ہی تمام اعداد خودبخود بھر جاتے ہیں

### مرحلہ 3: ہدف کا فاصلہ درج کریں
- "Target Distance" میں ہدف کا فاصلہ km میں لکھیں

### مرحلہ 4: حساب لگائیں
- **"Calculate Solution"** بٹن دبائیں
- فوری نتائج آئیں گے:
  - 🟢 **SHOOT** — حالات موافق، فائر کریں
  - 🟡 **WAIT** — حالات قابل قبول لیکن بہتر انتظار کریں
  - 🔴 **NO-SHOOT** — حالات ناموافق، فائر نہ کریں

### مرحلہ 5: AR اسکوپ استعمال کریں (موبائل پر)
1. فائرنگ سلوشن کے بعد **"🔭 Open Sniper Scope"** بٹن دبائیں
2. کیمرے کی اجازت دیں
3. **سرخ نشان** کراس ہیئر میں وہی جگہ دکھاتا ہے جہاں گولی لگے گی
4. اپنی اصل گن کا نشانہ اس سرخ نشان پر باندھیں

### مرحلہ 6: رینج کارڈ محفوظ کریں
- **"Export Range Card (PDF)"** بٹن سے پرنٹ/PDF محفوظ کریں

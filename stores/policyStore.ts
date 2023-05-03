import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePolicyStore = defineStore('policy', () => {
  const modalOpen = ref<boolean>(false)
  const policyType = ref('')
  const userPolicy = ref<string>(`一、會員
    1.使用本站所提供之會員服務時,於加入會員時所登錄之帳號及密碼使用之。\n
    2.會員須善盡帳號及密碼的使用與管理之責任。對於使用該會員之帳號及密碼(無關於會員本身或其他人)利用本站服務所造成或衍生之所有行為及結果,會員須自行負擔全部責任。\n
    3.會員之帳號及密碼遺失,或發現無故遭第三者盜用時,應立即通知本站連絡掛失,因未即時通知,導致本站無法有效防止及修改時,所造成的所有損失,會員應自負全責。\n
    4.每次結束使用本服務,執行會員之登出並關閉視窗,以確保您的會員權益。\n
    5.盜用第三者會員之帳號及密碼,導致第三者或本公司遭其他第三人或行政機關之調查或追訴時,第三者會員或本公司有權向您請求損害賠償,包括但不限於訴訟費用、律師費及商譽損失等。\n
    \n
    二、使用行為\n
    1.您使用本服務之一切行為必須符合當地或國際相關法令規範;對於使用者的一切行為,您須自行負擔全部責任。\n
    2.您同意絕不為非法之目的或以非法方式使用本服務,與確實遵守中華民國相關法規及網際網路之國際慣例,並保證不得利用本服務從事侵害他人權益或違法之行為。\n
    3.您於使用本站會員服務時應遵守以下限制:\n
     a)有損他人人格或商標權、著作權等智慧財產權或其他權利內容。\n
     b)使用違反公共秩序或善良風俗或其他不法之文字。\n
     c)強烈政治、宗教色彩的偏激言論。\n
     d)未經本公司許可,不得利用本服務或本網站所提供其他資源,包括但不限於圖文資料庫、編寫製作網頁之軟體等,從事任何商業交易行為,或招攬廣告商或贊助人。\n
     e)其他違反本站「使用者條款」的內容。\n
     \n
    三、免責事項\n
    1.下列情形發生時,本網站有權可以停止、中斷提供本服務:\n
     a)對本服務相關軟硬體設備進行更換、升級、保養或施工時。\n
     b)發生突發性之電子通信設備故障時。\n
     c)天災或其他不可抗力之因素致使本網站無法提供服務時。\n
    2.本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害,不負賠償責任。\n
    3.使用者對於上傳留言之文字、圖片及其它資料,應自行備份;本公司對於任何原因導致其內容全部或一部之滅失、毀損,不負任何責任。\n
    4.本公司對使用本服務之用途或所產生的結果,不負任何保證責任,亦不保證與本服務相關之軟體無缺失或會予以修正。\n
    5.對於您在本站中的所有言論、意見或行為僅代表您個人;不代表本公司的立場,本公司不負任何責任。本公司對於使用者所自稱之身分,不擔保其正確性。\n
    6.本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。\n
    7.對於您透過本服務所購買或取得,或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務,您應自行承擔其可能風險或依法向商品或服務提供者交涉求償,與本公司完全無關,本公司均不負任何責任。`)

  const privitePolicy =
    ref<string>(`非常歡迎您光臨「InSkill網站」(以下簡稱本網站),為了讓您能夠安心的使用本網站的各項服務與資訊,特此向您說明本網站的隱私權保護政策,以保障您的權益,請您詳閱下列內容:\n
    一、隱私權保護政策的適用範圍\n
    隱私權保護政策內容,包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站,也不適用於非本網站所委託或參與管理的人員。\n
    二、個人資料的蒐集、處理及利用方式\n
    當您造訪本網站或使用本網站所提供之功能服務時,我們將視該服務功能性質,請您提供必要的個人資料,並在該特定目的範圍內處理及利用您的個人資料;非經您書面同意,本網站不會將個人資料用於其他用途。\n
    本網站在您使用服務信箱、問卷調查等互動性功能時,會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。\n
    於一般瀏覽時,伺服器會自行記錄相關行徑,包括您使用連線設備的 IP 位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等,做為我們增進網站服務的參考依據,此記錄為內部應用,決不對外公佈。\n
    為提供精確的服務,我們會將收集的問卷調查內容進行統計與分析,分析結果之統計數據或說明文字呈現,除供內部研究外,我們會視需要公佈統計數據及說明文字,但不涉及特定個人之資料。\n
    您可以隨時向我們提出請求,以更正或刪除您的帳戶或本網站所蒐集的個人資料等隱私資訊。聯繫方式請見最下方聯繫管道。\n
    三、資料之保護\n
    本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施,加以保護網站及您的個人資料採用嚴格的保護措施,只由經過授權的人員才能接觸您的個人資料,相關處理人員皆簽有保密合約,如有違反保密義務者,將會受到相關的法律處分。\n
    如因業務需要有必要委託其他單位提供服務時,本網站亦會嚴格要求其遵守保密義務,並且採取必要檢查程序以確定其將確實遵守。
    四、網站對外的相關連結\n
    本網站的網頁提供其他網站的網路連結,您也可經由本網站所提供的連結,點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策,您必須參考該連結網站中的隱私權保護政策。\n
    五、與第三人共用個人資料之政策\n
    本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關,但有法律依據或合約義務者,不在此限。\n
    前項但書之情形包括不限於:\n
    經由您書面同意。\n
    法律明文規定。\n
    為免除您生命、身體、自由或財產上之危險。\n
    與公務機關或學術研究機構合作,基於公共利益為統計或學術研究而有必要,且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。\n
    當您在網站的行為,違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時,經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。\n
    本網站委託廠商協助蒐集、處理或利用您的個人資料時,將對委外廠商或個人善盡監督管理之責。\n
    六、Cookie 之使用\n
    為了提供您最佳的服務,本網站會在您的電腦中放置並取用我們的 Cookie,若您不願接受 Cookie 的寫入,您可在您使用的瀏覽器功能項中設定隱私權等級為高,即可拒絕 Cookie 的寫入,但可能會導致網站某些功能無法正常執行 。\n
    七、隱私權保護政策之修正\n
    本網站隱私權保護政策將因應需求隨時進行修正,修正後的條款將刊登於網站上。\n
    八、聯繫管道\n
    對於本站之隱私權政策有任何疑問,或者想提出變更、移除個人資料之請求,請前往本站「聯絡我們」頁面提交表單。`)

  const modalController = (type: string) => {
    policyType.value = type
    modalOpen.value = !modalOpen.value
  }

  return {
    modalOpen,
    policyType,
    userPolicy,
    privitePolicy,
    modalController
  }
})

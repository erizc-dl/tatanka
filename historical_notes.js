// Historical Notes overlay content. Three sections.
const HistoricalNotes = (() => {
  const primarySources = `
<div class="source-entry">
  <strong>Black Elk Speaks — John G. Neihardt, 1932</strong>
  Direct interviews with Nicholas Black Elk (Oglala Lakota holy man, b. 1863), who witnessed the aftermath of Wounded Knee at age 27. The quote used in the Survived Wounded Knee ending is verbatim: <em>"I did not know then how much was ended. When I look back now from this high hill of my old age, I can still see the butchered women and children lying heaped and scattered all along the crooked gulch as plain as when I saw them with eyes still young. And I can see that something else died there in the bloody mud, and was buried in the blizzard. A people's dream died there. It was a beautiful dream."</em><br>
  <a href="https://archive.org/details/blackelkspeaksbe00blac" target="_blank">archive.org/details/blackelkspeaksbe00blac</a>
</div>

<div class="source-entry">
  <strong>The Ghost-Dance Religion and the Sioux Outbreak of 1890 — James Mooney, Smithsonian Bureau of American Ethnology, 1896</strong>
  Mooney interviewed Wovoka, Lakota Ghost Dance participants, and military officers within five years of Wounded Knee. The single most comprehensive contemporary source for the events of 1890. Ghost shirts, Wovoka's vision, the agent's fear, and the victim descriptions all drawn from this report.<br>
  <a href="https://sova.si.edu/record/naa.1992-34" target="_blank">sova.si.edu/record/naa.1992-34</a>
</div>

<div class="source-entry">
  <strong>Lone Man (John Lone Man) Eyewitness Account of Sitting Bull's Arrest — c. 1915</strong>
  Lone Man was one of the forty-three Lakota policemen present at Sitting Bull's cabin on December 15, 1890. His testimony is the basis for the arrest scene dialogue, including Crow Foot's taunt and Sitting Bull's response. Crow Foot's age (14, born c. 1876) is corrected from earlier accounts. Collected in <em>The Dakota or Sioux in Minnesota</em> (Minnesota Historical Society).
</div>

<div class="source-entry">
  <strong>Treaty of Fort Laramie, 1868</strong>
  Granted the Lakota permanent ownership of the Black Hills, the Powder River country, and the right to hunt in unceded territories. Abrogated by Congress in 1877 following the Great Sioux War, without the consent of three-quarters of adult male Lakota as required by the treaty itself.<br>
  Full text: <a href="https://avalon.law.yale.edu/19th_century/nt002.asp" target="_blank">avalon.law.yale.edu/19th_century/nt002.asp</a><br>
  National Archives lesson: <a href="https://www.archives.gov/education/lessons/sioux-treaty" target="_blank">archives.gov/education/lessons/sioux-treaty</a>
</div>

<div class="source-entry">
  <strong>Partial Name List of the Wounded Knee Massacre</strong>
  Includes documented names of witnesses and victims such as Black Elk, Turning Hawk, and American Horse. A partial list is incorporated into the Wounded Knee inside-camp scene through descriptions.<br>
  <a href="http://arapahoelibraries.org/blogs/post/the-stain-remains-remembering-the-wounded-knee-massacre/" target="_blank">arapahoelibraries.org — The Stain Remains</a>
</div>
`;

  const secondarySources = `
<div class="source-entry">
  <strong>The Lakota Way — Joseph M. Marshall III, 2001</strong>
  Twelve Lakota virtues through story and history, written by a Lakota historian and storyteller of the Rosebud Sioux Tribe. Primary reference for daily life, cultural practices (haŋbléčheya, the čhaŋnúŋpa, the tiyóšpaye structure), and the Lakota language phrases used throughout. Joseph Marshall III is an enrolled member of the Rosebud Sioux Tribe.
</div>

<div class="source-entry">
  <strong>Sitting Bull: Champion of the Sioux — Stanley Vestal, 1932</strong>
  Biography drawing on interviews with people who knew Sitting Bull personally. Used for the Little Bighorn chapters, the Canadian exile period, and the circumstances of Sitting Bull's surrender and death.
</div>

<div class="source-entry">
  <strong>The Dawes Act and the Allotment of Indian Lands — D.S. Otis, 1973</strong>
  History of the 1887 General Allotment Act (Dawes Act), which broke up reservation land into individual allotments and opened "surplus" land to white settlement. The Great Sioux Reservation was reduced from 22.8 million acres to 12.5 million acres under the Sioux Act of 1889, passed over the objections of Lakota leaders.
</div>

<div class="source-entry">
  <strong>Haŋbléčheyapi — Crying for a Vision — Akta Lakota Museum &amp; Cultural Center</strong>
  Reference for the Vision Quest sequence (act1_vision_quest) and the three spirit animals (wolf, eagle, bear).<br>
  <a href="https://aktalakota.stjo.org/seven-sacred-rites/hanblecheyapi-crying-for-a-vision/" target="_blank">aktalakota.stjo.org — Seven Sacred Rites</a>
</div>

<div class="source-entry">
  <strong>The Plains Indians — National Park Service</strong>
  General reference on Plains tribal culture, the tipi/tepee structure, and the buffalo-centered economy.<br>
  <a href="https://www.nps.gov/articles/000/the-plains-indians.htm" target="_blank">nps.gov — The Plains Indians</a>
</div>

<div class="source-entry">
  <strong>Native American Tools — EBSCO Research Starters</strong>
  Reference on Indigenous tool-making, especially for the butchering scene and the role of bone, sinew, and stone in daily Lakota life.<br>
  <a href="https://www.ebsco.com/research-starters/anthropology/native-american-tools" target="_blank">ebsco.com — Native American Tools</a>
</div>

<div class="source-entry">
  <strong>Carlisle Indian School Digital Resource Center — Dickinson College</strong>
  Primary documents from the Carlisle Indian Industrial School. The school's methods, motto ("Kill the Indian, save the man"), and effects are documented here. The "before and after" photographs referenced in the Carlisle Father ending are real historical photographs available through this archive.<br>
  <a href="https://carlisleindian.dickinson.edu/" target="_blank">carlisleindian.dickinson.edu</a>
</div>

<div class="source-entry">
  <strong>Hardships for Native Americans — student research document</strong>
  Provided by the student. Defines key terms used in this game: <em>tepees</em> (Native American tents made by stretching buffalo skins on tall poles, carried on travois — sleds pulled by dogs and horses); <em>jerky</em> (a dried piece of meat, in this context buffalo meat that Indigenous women cut and dried on racks); <em>reservations</em> (a limited set of regions reserved by the U.S. government for Native Americans to live in, even though it was not the United States' land). See <code>Hardships for Native Americans.pdf</code> in the project root.
</div>
`;

  const documentedVsFictionalized = `
<div class="source-entry">
  <strong>Today</strong><br>
  There are over 170,000 enrolled Lakota people today. The Lakota language (Lakȟótiyapi), the Sun Dance (Wiwáŋyaŋg Wačhípi), and the čhaŋnúŋpa are all alive. The Lakota people have been seeking the return of the Black Hills — their sacred land — since 1980, when the U.S. Supreme Court ruled the seizure illegal but awarded only monetary compensation. The Lakota have refused the money. The Black Hills are not for sale.
</div>

<div class="source-entry">
  <strong>Named Lakota leaders</strong><br>
  All named Lakota leaders are real historical people: Sitting Bull (Tȟatȟáŋka Íyotake), Crazy Horse (Tȟašúŋke Witkó), Red Cloud (Maȟpíya Lúta), Big Foot (Uŋpȟáŋ Gleška / Spotted Elk). The events of the Little Bighorn (June 25–26, 1876), Sitting Bull's arrest and death (December 15, 1890), and the Wounded Knee Massacre (December 29, 1890) follow documented accounts. Crow Foot's challenge to his father before the arrest is documented in eyewitness testimony. Black Coyote's resistance during the weapon search is documented by survivors.
</div>

<div class="source-entry">
  <strong>The player character and immediate family</strong><br>
  The player character, Iná, Atéwaye, Misúŋ, and the player's wife are composite fictional characters representing the experience of Hunkpapa and Oglala Lakota people during this period. They are not based on any single real person. Their deaths and survival reflect statistically documented patterns, not specific documented individuals.
</div>

<div class="source-entry">
  <strong>The Vision Quest and spirit animals</strong><br>
  The haŋbléčheya (crying for a dream / vision quest) is a real Lakota spiritual practice. The three spirit animals presented (wolf, eagle, bear) are among the recognized spirit helpers in Lakota tradition. The specific vision sequences in this game are fictionalized. We have tried to portray the practice with respect and without appropriation.
</div>

<div class="source-entry">
  <strong>The Wounded Knee victim list</strong><br>
  The scrolling victim list in the Wounded Knee inside-camp scene uses descriptions rather than invented names. The documented names exist (maintained by the Wounded Knee Survivors Association and compiled by Mooney in 1896) but not all are confirmable with ages. We use descriptions out of caution against error, not out of disregard.
</div>
`;

  return { primarySources, secondarySources, documentedVsFictionalized };
})();

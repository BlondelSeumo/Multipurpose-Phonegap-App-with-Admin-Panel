-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2020 at 09:29 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

-- --------------------------------------------------------

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `brief`, `location`, `attachment`, `cover_image`, `column_class`, `fullwidth`, `circular`, `equal_height`, `display_type`, `display_content`, `carousel_column`, `carousel_height`, `carousel_align`, `user_id`, `visibility`, `active`, `auth_user`, `updated`) VALUES
(1, 'Adventure', '', 'Italy', '126,125,124,123', '124', 's12', '', '', '', 'grid', 'none', '', '', '', 1, 'public', '1', 1, 1590475541),
(2, 'Tour', '', 'Italy', '126,125,124,123', '123', 's12', '', '', '', 'grid', 'none', '', '', '', 2, 'public', '1', 1, 1590475546),
(3, 'Vacation', '', 'Italy', '129,128,127', '128', 's12', '', '', '', 'grid', 'none', '', '', '', 1, 'public', '1', 1, 1590475555),
(4, 'Fashion', '', 'USA', '130,131,132,', '131', 's12', '', '', '', 'grid', 'none', '', '', '', 2, 'public', '1', 1, 1590475559),
(5, 'Being Stylish', '', 'Italy', '133,134,135,136,', '134', 's12', '', '', '', 'grid', 'none', '', '', '', 3, 'public', '1', 1, 1590475562),
(6, 'Friends Tour', '', 'Italy', '137,138,139,140,', '139', 's12', '', '', '', 'carousel', 'none', 'single', '400px', '', 4, 'public', '1', 1, 1590475565),
(7, 'Office tour', '', 'Italy', '152,151,150,149,148,147,146,145', '147', 's6', '', '', '', 'grid', 'none', '', '', '', 5, 'public', '1', 1, 1590475571),
(8, 'Climbing', '', 'Italy', '153,154,155,156,', '154', 's12', '', '', '', 'carousel', 'none', '', '500px', '', 6, 'public', '1', 1, 1590475575),
(9, 'Fun sports', '', 'London', '157,158,159,160,', '158', 's6', '', '', '', 'grid', 'none', '', '', '', 7, 'public', '1', 1, 1590475579),
(10, 'My Desk', '', 'Italy', '161,162,163,164,165,166,', '162', 's12', '', '', '', 'carousel', 'none', 'multi', '300px', '', 8, 'public', '1', 1, 1590475583),
(11, 'Work', '', 'India', '167,168,169,170,171,', '169', 's6', '1', '', '', 'masonry', 'none', '', '', '', 9, 'public', '1', 1, 1590475586),
(12, 'Style and Fashion', '', 'Italy', '172,173,174,175,', '174', 's12', '', '', '', 'grid', 'none', '', '', '', 10, 'public', '1', 1, 1590475590),
(13, 'Getting Better', '', 'Italy', '192,193,194,195,196,197,', '194', 's12', '', '', '', 'grid', 'none', '', '', '', 11, 'public', '1', 1, 1590475593),
(14, 'Latest Trend', '', 'Germany', '185,186,187,188,189,190,191,', '187', 's6', '1', '', '', 'masonry', 'none', '', '', '', 12, 'public', '1', 1, 1590475597),
(15, 'Corporate', '', 'Italy', '181,182,183,184,', '183', 's12', '', '', '', 'grid', 'none', '', '', '', 13, 'public', '1', 1, 1590475600),
(16, 'Nature', '', 'Italy', '176,177,178,179,180,', '178', 's12', '', '', '', 'grid', 'none', '', '', '', 14, 'public', '1', 1, 1590475606),
(17, 'Proactive', '', 'Berlin', '198,199,200,201,202,203,', '200', 's12', '', '', '', 'grid', 'none', '', '', '', 15, 'public', '1', 1, 1590475609),
(18, 'Adventure', '', 'Italy', '126,125,124,123', '', 's12', '', '', '', 'grid', 'none', '', '', '', 15, 'public', '1', 1, 1590474021),
(19, 'Tour', '', 'Italy', '126,125,124,123', '125', 's12', '', '', '', 'grid', 'none', '', '', '', 9, 'public', '1', 1, 1590474389),
(20, 'Vacation', '', 'Italy', '129,128,127', '', 's12', '', '', '', 'grid', 'none', '', '', '', 4, 'public', '1', 1, 1590474484),
(21, 'Fashion', '', 'USA', '130,131,132,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 7, 'public', '1', 1, 1590474686),
(22, 'Being Stylish', '', 'Italy', '133,134,135,136,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 10, 'public', '1', 1, 1590474720),
(23, 'Friends Tour', '', 'Italy', '137,138,139,140,', '', 's12', '', '', '', 'carousel', 'none', 'single', '400px', '', 1, 'public', '1', 1, 1590474795),
(24, 'Office tour', '', 'Italy', '152,151,150,149,148,147,146,145', '', 's6', '', '', '', 'grid', 'none', '', '', '', 2, 'public', '1', 1, 1590474882),
(25, 'Climbing', '', 'Italy', '153,154,155,156,', '', 's12', '', '', '', 'carousel', 'none', '', '500px', '', 3, 'public', '1', 1, 1590474929),
(26, 'Fun sports', '', 'London', '157,158,159,160,', '', 's6', '', '', '', 'grid', 'none', '', '', '', 8, 'public', '1', 1, 1590474965),
(27, 'My Desk', '', 'Italy', '161,162,163,164,165,166,', '', 's12', '', '', '', 'carousel', 'none', 'multi', '300px', '', 5, 'public', '1', 1, 1590475000),
(28, 'Work', '', 'India', '167,168,169,170,171,', '', 's6', '1', '', '', 'masonry', 'none', '', '', '', 6, 'public', '1', 1, 1590475044),
(29, 'Style and Fashion', '', 'Italy', '172,173,174,175,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 11, 'public', '1', 1, 1590475089),
(30, 'Getting Better', '', 'Italy', '192,193,194,195,196,197,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 12, 'public', '1', 1, 1590475255),
(31, 'Latest Trend', '', 'Germany', '185,186,187,188,189,190,191,', '', 's6', '1', '', '', 'masonry', 'none', '', '', '', 14, 'public', '1', 1, 1590475209),
(32, 'Corporate', '', 'Italy', '181,182,183,184,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 1, 'public', '1', 1, 1590475155),
(33, 'Nature', '', 'Italy', '176,177,178,179,180,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 12, 'public', '1', 1, 1590475123),
(34, 'Proactive', '', 'Berlin', '198,199,200,201,202,203,', '', 's12', '', '', '', 'grid', 'none', '', '', '', 13, 'public', '1', 1, 1590475280);

-- --------------------------------------------------------

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `blog_date`, `user_id`, `brief`, `description`, `blog_category`, `attachment`, `status`, `timestamp`, `auth_user`, `updated`) VALUES
(1, 'Dynamic website building ideas', '1590416340', 2, 'Hello, there is a latest trend going on right now regarding the monotones in web design. You can read more here. Continue reading this article for latest info...', '<p>Hello, there is a latest trend going on right now regarding the monotones in web design. You can read more here. Continue reading this article for latest info. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process.</p>\\\\n<p></p>\\\\n<p>The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, &amp; graphic design) may also be a design activity.</p>\\\\n<p></p>\\\\n<p>The design usually has to satisfy certain goals and constraints, may take into account aesthetic, functional, economic, or socio-political considerations, and is expected to interact with a certain environment.</p>\\\\n<p></p>\\\\n<p>A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process.</p>\\\\n<p></p>\\\\n<p>The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, &amp; graphic design) may also be a design activity.</p>', 1, '70', 'publish', 1590416380, 1, 1591529522),
(29, 'Build your functional website in 2 days', '1590589047', 1, 'Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for a...', '<p>Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for a...\\\\r\\\\n        Do you think you\\\\\\\'re living an ordinary life? You are so mistaken it\\\\\\\'s difficult to even explain. The mere fact that you exist makes you extraordinary. The odds of you existing are less than winning th...</p><p></p><p>Design philosophies are usually for determining design goals. A design goal may range from solving the least significant individual problem of the smallest element, to the most holistic influential ut...Things aren\\\\\\\'t going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon. she\\\\\\\'ll prove she can again. We all already know this...</p><p></p><p>What were they eating? It didn\\\\\\\'t taste like anything she had ever eaten before and although she was famished, she didn\\\\\\\'t dare ask. She knew the answer would be one she didn\\\\\\\'t want to hear. she\\\\\\\'ll prov...What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life. she\\\\\\\'ll ...</p>', 1, '71', 'publish', 1590416380, 1, 1591022460),
(30, 'Make the best of your creativity', '1590589047', 1, 'He couldn\'t move. His head throbbed and spun. He couldn\'t decide if it was the flu or the drinking last night. It was probably a combination of both. she\'ll prove she can again. We all already know th...', '<p>He couldn\\\\\\\'t move. His head throbbed and spun. He couldn\\\\\\\'t decide if it was the flu or the drinking last night. It was probably a combination of both. she\\\\\\\'ll prove she can again. We all already know th...\\\\r\\\\n        The boy walked down the street in a carefree way, playing without notice of what was about him. He didn\\\\\\\'t hear the sound of the car as his ball careened into the road. He took a step toward it, and in...</p><p></p><p>If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you\\\\\\\'ll have a rough idea of what they looked like -- except for their teeth. Th...It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe c...</p><p></p><p>Sometimes that\\\\\\\'s just the way it has to be. Sure, there were probably other options, but he didn\\\\\\\'t let them enter his mind. It was done and that was that. It was just the way it had to be. she\\\\\\\'ll prov...Eating raw fish didn\\\\\\\'t sound like a good idea. It\\\\\\\'s a delicacy in Japan, didn\\\\\\\'t seem to make it any more appetizing. Raw fish is raw fish, delicacy or not. she\\\\\\\'ll prove she can again. We all already k...</p>', 1, '72', 'publish', 1590416380, 1, 1591022463),
(31, 'Keeping your activities on track', '1590576780', 1, 'Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul\'...', '<p>Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul\\\\\\\'...\\\\r\\\\n        She tried not to judge him. His ratty clothes and unkempt hair made him look homeless. Was he really the next Einstein as she had been told? On the off chance it was true, she continued to try not to ...</p><p></p><p>There was no time. He ran out of the door without half the stuff he needed for work, but it didn\\\\\\\'t matter. He was late and if he didn\\\\\\\'t make this meeting on time, someone\\\\\\\'s life may be in danger. she\\\\\\\'...Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, emphasizing the depth of her eyes. She was rather handsome than beautiful. Her face was captivating by reason of ...</p><p></p><p>I\\\\\\\'m going to hire professional help tomorrow. I can\\\\\\\'t handle this anymore. She fell over the coffee table and now there is blood in her catheter. This is much more than I ever signed up to do. she\\\\\\\'ll ...Another definition of design is planning to manufacture an object, system, component or structure. Thus the word design can be used as a noun or a verb. In a broader sense, design is an applied art an...</p>', 1, '73', 'publish', 1590416380, 1, 1591022466),
(32, 'Managing UI and UX development', '1590399720', 1, 'What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect sense, but is something I never noticed before. Wh...', '<p>What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect sense, but is something I never noticed before. Wh...\\\\r\\\\n        Do you really listen when you are talking with someone? I have a friend who listens in an unforgiving way. She actually takes every word you say as being something important and when you have a friend...</p><p></p><p>I haven\\\\\\\'t bailed on writing. Look, I\\\\\\\'m generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again! ...Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which one I hope you are, but that\\\\\\\'s not for me to decide....</p><p></p><p>He sat across from her trying to imagine it was the first time. It wasn\\\\\\\'t. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himsel...The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. A...</p>', 1, '74', 'publish', 1590416380, 1, 1591022468),
(33, 'Bringing positive outlook of your project', '1590506040', 1, 'Sometimes there isn\'t a good answer. No matter how you try to rationalize the outcome, it doesn\'t make sense. And instead of an answer, you are simply left with a question. Why? And instead of an answ...', '<p>Sometimes there isn\\\\\\\'t a good answer. No matter how you try to rationalize the outcome, it doesn\\\\\\\'t make sense. And instead of an answer, you are simply left with a question. Why? And instead of an answ...\\\\r\\\\n        According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, “College Hall (is) the oldest building in continuous use fo...</p><p></p><p>Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Di...It\\\\\\\'s always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn\\\\\\\'t have to worry. Only the slowest in the group do. That was the lesson they were...</p><p></p><p>Don\\\\\\\'t be scared. The things out there that are unknown aren\\\\\\\'t scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be...It was difficult to explain to them how the diagnosis of certain death had actually given him life. While everyone around him was in tears and upset, he actually felt more at ease. The doctor said it ...</p>', 1, '75', 'publish', 1590416380, 1, 1591022470),
(34, 'Making the best of your time', '1590725820', 1, 'She wondered if the note had reached him. She scolded herself for not handing it to him in person. She trusted her friend, but so much could happen. She waited impatiently for word. she\'ll prove she c...', '<p>She wondered if the note had reached him. She scolded herself for not handing it to him in person. She trusted her friend, but so much could happen. She waited impatiently for word. she\\\\\\\'ll prove she c...\\\\r\\\\n        Stranded. Yes, she was now the first person ever to land on Venus, but that was of little consequence. Her name would be read by millions in school as the first to land here, but that celebrity would ...</p><p></p><p>Here\\\\\\\'s the thing. She doesn\\\\\\\'t have anything to prove, but she is going to anyway. That\\\\\\\'s just her character. She knows she doesn\\\\\\\'t have to, but she still will just to show you that she can. Doubt her ...Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon ...</p><p></p><p>Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal...I\\\\\\\'m heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for the festival there. I will be making October plans once there and will try to arrange so I\\\\\\\'m back here for ...</p>', 1, '76', 'publish', 1590416380, 1, 1591022472),
(35, 'Build a Successful project with ease', '1590848247', 1, 'There wasn\'t a bird in the sky, but that was not what caught her attention. It was the clouds. The deep green that isn\'t the color of clouds, but came with these. She knew what was coming and she hope...', '<p>There wasn\\\\\\\'t a bird in the sky, but that was not what caught her attention. It was the clouds. The deep green that isn\\\\\\\'t the color of clouds, but came with these. She knew what was coming and she hope...\\\\r\\\\n        He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? Not enough, the said under his breath. I need more. she\\\\\\\'ll prove she can again. We all...</p><p></p><p>It went through such rapid contortions that the little bear was forced to change his hold on it so many times he became confused in the darkness, and could not, for the life of him, tell whether he he...One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s ...</p><p></p><p>The computer wouldn\\\\\\\'t start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this mo...He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint. It wasn\\\\\\\'t a gunshot, it wasn\\\\\\\'t a gunshot, he repeated under his breathlessne...</p>', 1, '77', 'publish', 1590416380, 1, 1591022474),
(36, 'CMS systems in market today to know about', '1590932100', 1, 'You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you\'re done. That way even after you\'re gone, you will still live on...', '<p>You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you\\\\\\\'re done. That way even after you\\\\\\\'re gone, you will still live on...\\\\r\\\\n        Where do they get a random paragraph? he wondered as he clicked the generate button. Do they just write a random paragraph or do they get it somewhere? At that moment he read the random paragraph and ...</p><p></p><p>It may involve considerable research, thought, modeling, interactive adjustment, and re-design. Meanwhile, diverse kinds of objects may be designed, including clothing, graphical user interfaces, prod...Out of another, I get a lovely view of the bay and a little private wharf belonging to the estate. There is a beautiful shaded lane that runs down there from the house. I always fancy I see people wal...</p><p></p><p>This is important to remember. Love isn\\\\\\\'t like pie. You don\\\\\\\'t need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn\\\\\\\'t run out, s...I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, ...</p>', 1, '78', 'publish', 1590416380, 1, 1591022483),
(37, 'CMS systems in market today to know about', '1590927420', 1, 'This is important to remember. Love isn\'t like pie. You don\'t need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn\'t run out, s...', '<p>This is important to remember. Love isn\\\\\\\'t like pie. You don\\\\\\\'t need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn\\\\\\\'t run out, s...\\\\r\\\\n        Stranded. Yes, she was now the first person ever to land on Venus, but that was of little consequence. Her name would be read by millions in school as the first to land here, but that celebrity would ...</p><p></p><p>What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect sense, but is something I never noticed before. Wh...It was difficult to explain to them how the diagnosis of certain death had actually given him life. While everyone around him was in tears and upset, he actually felt more at ease. The doctor said it ...</p><p></p><p>Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Di...She tried not to judge him. His ratty clothes and unkempt hair made him look homeless. Was he really the next Einstein as she had been told? On the off chance it was true, she continued to try not to ...</p>', 1, '79', 'publish', 1590416380, 1, 1591022481),
(38, 'Keeping your activities on track', '1589984247', 1, 'Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul\'...', '<p>Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul\\\\\\\'...\\\\r\\\\n        I\\\\\\\'m going to hire professional help tomorrow. I can\\\\\\\'t handle this anymore. She fell over the coffee table and now there is blood in her catheter. This is much more than I ever signed up to do. she\\\\\\\'ll ...</p><p></p><p>He wondered if he should disclose the truth to his friends. It would be a risky move. Yes, the truth would make things a lot easier if they all stayed on the same page, but the truth might fracture th...It\\\\\\\'s always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn\\\\\\\'t have to worry. Only the slowest in the group do. That was the lesson they were...</p><p></p><p>The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. A...He heard the crack echo in the late afternoon about a mile away. His heart started racing and he bolted into a full sprint. It wasn\\\\\\\'t a gunshot, it wasn\\\\\\\'t a gunshot, he repeated under his breathlessne...</p>', 2, '89', 'publish', 1590416380, 1, 1591022479),
(39, 'Tuning proper development techniques', '1590846060', 1, 'Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which one I hope you are, but that\'s not for me to decide....', '<p>Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which one I hope you are, but that\\\\\\\'s not for me to decide....\\\\r\\\\n        The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more h...</p><p></p><p>Things aren\\\\\\\'t going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon. she\\\\\\\'ll prove she can again. We all already know this...She wondered if the note had reached him. She scolded herself for not handing it to him in person. She trusted her friend, but so much could happen. She waited impatiently for word. she\\\\\\\'ll prove she c...</p><p></p><p>Another definition of design is planning to manufacture an object, system, component or structure. Thus the word design can be used as a noun or a verb. In a broader sense, design is an applied art an...Where do they get a random paragraph? he wondered as he clicked the generate button. Do they just write a random paragraph or do they get it somewhere? At that moment he read the random paragraph and ...</p>', 2, '88', 'publish', 1590416380, 1, 1591022477),
(40, 'Modern Web Design trends for you', '1590491820', 1, 'Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for a...', '<p>Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosphere. Hundreds must have seen it and taken it for a...\\\\r\\\\n        Design philosophies are usually for determining design goals. A design goal may range from solving the least significant individual problem of the smallest element, to the most holistic influential ut...</p><p></p><p>There was no time. He ran out of the door without half the stuff he needed for work, but it didn\\\\\\\'t matter. He was late and if he didn\\\\\\\'t make this meeting on time, someone\\\\\\\'s life may be in danger. she\\\\\\\'...You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you\\\\\\\'re done. That way even after you\\\\\\\'re gone, you will still live on...</p><p></p><p>The red ball sat proudly at the top of the toybox. It had been the last to be played with and anticipated it would be the next as well. The other toys grumbled beneath. At one time each had held the s...Eating raw fish didn\\\\\\\'t sound like a good idea. It\\\\\\\'s a delicacy in Japan, didn\\\\\\\'t seem to make it any more appetizing. Raw fish is raw fish, delicacy or not. she\\\\\\\'ll prove she can again. We all already k...</p>', 2, '87', 'publish', 1590416380, 1, 1591022485),
(41, 'Make the best of your website campaign', '1591193820', 1, 'Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal...', '<p>Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal...\\\\r\\\\n        Here\\\\\\\'s the thing. She doesn\\\\\\\'t have anything to prove, but she is going to anyway. That\\\\\\\'s just her character. She knows she doesn\\\\\\\'t have to, but she still will just to show you that she can. Doubt her ...</p><p></p><p>Don\\\\\\\'t be scared. The things out there that are unknown aren\\\\\\\'t scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be...There wasn\\\\\\\'t a bird in the sky, but that was not what caught her attention. It was the clouds. The deep green that isn\\\\\\\'t the color of clouds, but came with these. She knew what was coming and she hope...</p><p></p><p>If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you\\\\\\\'ll have a rough idea of what they looked like -- except for their teeth. Th...Sometimes that\\\\\\\'s just the way it has to be. Sure, there were probably other options, but he didn\\\\\\\'t let them enter his mind. It was done and that was that. It was just the way it had to be. she\\\\\\\'ll prov...</p>', 2, '86', 'publish', 1590416380, 1, 1591022487),
(42, 'Web designing at its very best', '1590769020', 1, 'What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life. she\'ll ...', '<p>What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life. she\\\\\\\'ll ...\\\\r\\\\n        The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. ,Sir, you will undoubtedly end up in a drunkard\\\\\\\'s grave, dead of hepatic cir...</p><p></p><p>I haven\\\\\\\'t bailed on writing. Look, I\\\\\\\'m generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again! ...Out of another, I get a lovely view of the bay and a little private wharf belonging to the estate. There is a beautiful shaded lane that runs down there from the house. I always fancy I see people wal...</p><p></p><p>It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe c...He sat across from her trying to imagine it was the first time. It wasn\\\\\\\'t. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. His mind wandered until he caught himsel...</p>', 2, '85', 'publish', 1590416380, 1, 1591022489),
(43, 'Bringing positive outlook of your project', '1589206620', 1, 'Do you really listen when you are talking with someone? I have a friend who listens in an unforgiving way. She actually takes every word you say as being something important and when you have a friend...', '<p>Do you really listen when you are talking with someone? I have a friend who listens in an unforgiving way. She actually takes every word you say as being something important and when you have a friend...\\\\r\\\\n        I\\\\\\\'m heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for the festival there. I will be making October plans once there and will try to arrange so I\\\\\\\'m back here for ...</p><p></p><p>It may involve considerable research, thought, modeling, interactive adjustment, and re-design. Meanwhile, diverse kinds of objects may be designed, including clothing, graphical user interfaces, prod...Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon ...</p><p></p><p>The boy walked down the street in a carefree way, playing without notice of what was about him. He didn\\\\\\\'t hear the sound of the car as his ball careened into the road. He took a step toward it, and in...Sometimes there isn\\\\\\\'t a good answer. No matter how you try to rationalize the outcome, it doesn\\\\\\\'t make sense. And instead of an answer, you are simply left with a question. Why? And instead of an answ...</p>', 2, '84', 'publish', 1590416380, 1, 1591022492),
(44, 'Managing UI and UX development', '1590070620', 1, 'She looked at her student wondering if she could ever get through. You need to learn to think for yourself, she wanted to tell him. Your friends are holding you back and bringing you down. But she did...', '<p>She looked at her student wondering if she could ever get through. You need to learn to think for yourself, she wanted to tell him. Your friends are holding you back and bringing you down. But she did...\\\\r\\\\n        I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, ...</p><p></p><p>One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s ...According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, “College Hall (is) the oldest building in continuous use fo...</p><p></p><p>The computer wouldn\\\\\\\'t start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this mo...What were they eating? It didn\\\\\\\'t taste like anything she had ever eaten before and although she was famished, she didn\\\\\\\'t dare ask. She knew the answer would be one she didn\\\\\\\'t want to hear. she\\\\\\\'ll prov...</p>', 2, '83', 'publish', 1590416380, 1, 1591022501),
(45, 'CMS systems in market today to know about', '1590070620', 1, 'The red ball sat proudly at the top of the toybox. It had been the last to be played with and anticipated it would be the next as well. The other toys grumbled beneath. At one time each had held the s...', '<p>The red ball sat proudly at the top of the toybox. It had been the last to be played with and anticipated it would be the next as well. The other toys grumbled beneath. At one time each had held the s...\\r\\n I haven\\\'t bailed on writing. Look, I\\\'m generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again! ...</p><p></p><p>She tried not to judge him. His ratty clothes and unkempt hair made him look homeless. Was he really the next Einstein as she had been told? On the off chance it was true, she continued to try not to ...If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you\\\'ll have a rough idea of what they looked like -- except for their teeth. Th...</p><p></p><p>She wondered if the note had reached him. She scolded herself for not handing it to him in person. She trusted her friend, but so much could happen. She waited impatiently for word. she\\\'ll prove she c...There was no time. He ran out of the door without half the stuff he needed for work, but it didn\\\'t matter. He was late and if he didn\\\'t make this meeting on time, someone\\\'s life may be in danger. she\\\'...</p>', 2, '82', 'publish', 1590416380, 1, 1590420450),
(46, 'Keeping your activities on track', '1589204520', 1, 'The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more h...', '<p>The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more h...\\\\r\\\\n        It may involve considerable research, thought, modeling, interactive adjustment, and re-design. Meanwhile, diverse kinds of objects may be designed, including clothing, graphical user interfaces, prod...</p><p></p><p>There wasn\\\\\\\'t a bird in the sky, but that was not what caught her attention. It was the clouds. The deep green that isn\\\\\\\'t the color of clouds, but came with these. She knew what was coming and she hope...Eating raw fish didn\\\\\\\'t sound like a good idea. It\\\\\\\'s a delicacy in Japan, didn\\\\\\\'t seem to make it any more appetizing. Raw fish is raw fish, delicacy or not. she\\\\\\\'ll prove she can again. We all already k...</p><p></p><p>Don\\\\\\\'t be scared. The things out there that are unknown aren\\\\\\\'t scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be...The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. A...</p>', 2, '81', 'publish', 1590416380, 1, 1591022496),
(47, 'Bringing positive outlook of your project', '1589810760', 1, 'What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life. she\'ll ...', '<p>What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life. she\\\\\\\'ll ...\\\\r\\\\n        I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, ...</p><p></p><p>It\\\\\\\'s always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn\\\\\\\'t have to worry. Only the slowest in the group do. That was the lesson they were...He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? Not enough, the said under his breath. I need more. she\\\\\\\'ll prove she can again. We all...</p><p></p><p>This is important to remember. Love isn\\\\\\\'t like pie. You don\\\\\\\'t need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn\\\\\\\'t run out, s...The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. ,Sir, you will undoubtedly end up in a drunkard\\\\\\\'s grave, dead of hepatic cir...</p>', 2, '80', 'publish', 1590416380, 1, 1591022494);

-- --------------------------------------------------------

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `brief`, `auth_user`, `updated`) VALUES
(1, 'Grid', 'Grid Style blogs', 1, 1590417306),
(2, 'Masonry', 'Masonry style blogs', 1, 1590417324);

-- --------------------------------------------------------


--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `from_user_id`, `to_user_id`, `message`, `attachment`, `mark_read`, `star`, `type`, `type_id`, `timestamp`, `auth_user`, `updated`) VALUES
(1, 1, 2, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(2, 1, 2, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(3, 1, 2, 'Hope you are fine', '', 0, '', '', 0, 1590476614, 1, 1590476614),
(4, 1, 2, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(5, 2, 1, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(6, 2, 1, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711),
(7, 1, 3, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(8, 1, 3, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(17, 1, 3, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(18, 1, 3, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(19, 1, 5, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(20, 2, 4, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(21, 2, 7, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711),
(22, 1, 7, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(23, 1, 6, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(24, 1, 6, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(25, 2, 9, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(26, 1, 10, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711),
(27, 1, 11, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(28, 1, 12, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(29, 2, 12, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(30, 5, 13, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(31, 3, 14, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711),
(32, 1, 15, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(33, 9, 1, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(34, 8, 4, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(35, 7, 2, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(36, 6, 1, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711),
(37, 1, 3, 'Hello, how are you doing?', '', 0, '', '', 0, 1590476579, 1, 1590476579),
(38, 1, 3, 'Hope you are fine', '', 0, '', '', 0, 1590476610, 1, 1590476610),
(39, 2, 5, '', '209', 0, '', '', 0, 1590476659, 1, 1590476660),
(40, 3, 4, 'Hi, doing good.. How are you', '', 1, '', '', 0, 1590476691, 1, 1590476696),
(41, 4, 7, 'How are all at home', '', 1, '', '', 0, 1590476709, 1, 1590476711);

-- --------------------------------------------------------

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `url`, `image`, `auth_user`, `updated`) VALUES
(1, 'Facebook', 'http://facebook.com', '13', 1, 1590391478),
(2, 'Linkedin', 'http://linkedin.com', '14', 1, 1590391509),
(3, 'Twitter', 'http://twitter.com', '15', 1, 1590391567),
(4, 'Microsoft', 'http://microsoft.com', '16', 1, 1590391598),
(5, 'Instagram', 'http://instagram.com', '18', 1, 1590391698),
(6, 'Dribbble', 'http://dribbble.com', '20', 1, 1590391840),
(7, 'Pinterest', 'http://pinterest.com', '21', 1, 1590391908),
(8, 'GitHub', 'http://github.com', '22', 1, 1590391958);

-- --------------------------------------------------------

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `image`, `user_id`, `auth_user`, `updated`) VALUES
(1, 'Carol Blake', 'carolemail@example.com', '9594858343', '41', 11, 1, 1590396355),
(2, 'Diana Bailey', 'dianamail@example.com', '9594598343', '42', 11, 1, 1590396355),
(3, 'Hamnet', 'haronowitz0@mlb.com', '5915009589', '43', 11, 1, 1590396355),
(4, 'Effie', 'emayhew1@shareasale.com', '2645315896', '44', 5, 1, 1590396355),
(5, 'Marlane', 'mwhapples2@theatlantic.com', '8899394328', '45', 4, 1, 1590396355),
(6, 'Allianora', 'afyfield3@umich.edu', '6331571180', '46', 11, 1, 1590396355),
(7, 'Ermin', 'erounsivall4@twitter.com', '4751145050', '47', 12, 1, 1590396355),
(8, 'Alia', 'apuddifer5@123-reg.co.uk', '2761281646', '48', 1, 1, 1590396355),
(9, 'Fredrika', 'fmacgill6@ted.com', '4839610071', '49', 13, 1, 1590396355),
(10, 'Wynnie', 'wmount7@blogger.com', '5503387893', '50', 1, 1, 1590396355),
(11, 'Emmett', 'elortzing8@paypal.com', '7264151865', '51', 6, 1, 1590396355),
(12, 'Inna', 'igueste9@hud.gov', '7579414193', '52', 7, 1, 1590396355),
(13, 'Arabela', 'amaccaughena@quantcast.com', '4098748206', '53', 8, 1, 1590396355),
(14, 'Justin', 'jmcentegartb@who.int', '5627955248', '54', 11, 1, 1590396355),
(15, 'Elyssa', 'emiettinenc@dailymotion.com', '5593150383', '55', 10, 1, 1590396355),
(16, 'Dawna', 'dtanslyd@reference.com', '2266740261', '56', 9, 1, 1590396355),
(17, 'Jasen', 'jpylkynytone@vk.com', '6995223071', '57', 1, 1, 1590396355),
(18, 'Fredek', 'fdilowayf@webeden.co.uk', '9864429068', '58', 12, 1, 1590396355),
(19, 'Shadow', 'sbarczynskig@paypal.com', '9934192275', '59', 13, 1, 1590396355),
(20, 'Chrysler', 'cbaffh@nature.com', '6787493016', '60', 1, 1, 1590396355),
(21, 'Cherida', 'cgoveri@51.la', '9425193549', '61', 1, 1, 1590396355),
(22, 'Giffard', 'gpashbyj@liveinternet.ru', '5375549317', '62', 1, 1, 1590396355),
(23, 'Bale', 'btomaellok@home.pl', '9285955315', '63', 1, 1, 1590396355),
(24, 'Carlita', 'creadwinl@ebay.com', '3128919677', '64', 1, 1, 1590396355),
(25, 'Chrystel', 'cwiddisonm@bandcamp.com', '1079759308', '65', 1, 1, 1590396355),
(26, 'Lucinda', 'larmatidgen@phpbb.com', '8513661773', '66', 1, 1, 1590396355),
(27, 'Alane', 'akleimto@posterous.com', '6132459675', '67', 1, 1, 1590396355),
(28, 'Mitzi', 'mkidstonep@lulu.com', '5712420893', '68', 1, 1, 1590396355),
(29, 'Gwyneth', 'gjackwaysq@artisteer.com', '8866800255', '69', 1, 1, 1590396355);

-- --------------------------------------------------------

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `from_date`, `to_date`, `users`, `contacts`, `brief`, `location`, `event_category`, `attachment`, `eventtype`, `user_id`, `active`, `timestamp`, `auth_user`, `updated`) VALUES
(1, 'Trending Technology', '1595746800', '1595930400', ',2,3,4,', ',2,3,4,12,13,', 'Get to know about the latest trending technologies in today\'s time. Get the best of new and old tech.', 'Mumbai', 2, '204,205,206,', 'global', 1, 1, 0, 1, 1590475860),
(2, 'Business Workshop', '1593240720', '1593328200', ',2,3,', ',17,18,19,', 'All the latest business related tech and startups..', 'Berlin', 1, '', 'global', 3, 1, 0, 1, 1590476114),
(3, 'Fitness For All', '1591858500', '1592031300', ',11,12,', ',3,4,5,6,7,8,9,10,11,', 'INDOOR {Cycling/ Running/ Walking/ Yoga/ Zumba/ Dance/ Functional Trainning/ All types of Exercise.} Anywhere Anytime.', 'Mumbai', 3, '207,208,', 'global', 4, 1, 0, 1, 1590476187),
(4, 'Run for Support', '1589439450', '1590044250', ',10,11,12,', ',17,18,19,', 'We will be cheering on our neighbours as we run across 8 countries in Asia every 15 days', 'Singapore', 4, '', 'global', 8, 1, 0, 1, 1590476307),
(5, 'Agile Coaching Bootcamp', '1590476316', '1590476316', ',3,6,8,', ',21,22,23,', 'A virtual class offers participants an immersive learning experience with greater flexibility. Highly interactive coaching course to develop professional coaching skills and create an environment for High-Performance Teams.', 'Kolkata', 2, '', 'global', 13, 1, 0, 1, 1590476376),
(6, 'CIRCUIT BREAKER', '1594796381', '1595401181', ',12,13,', ',3,16,17,19,', 'this Circuit Breaker Virtual Run hopes to foster healthy living lifestyle in our sporting community.', 'Ahmedabad', 0, '', 'global', 13, 1, 0, 1, 1590476462);

-- --------------------------------------------------------

--
-- Dumping data for table `event_categories`
--

INSERT INTO `event_categories` (`id`, `name`, `brief`, `auth_user`, `updated`) VALUES
(1, 'Business', 'Business related events', 1, 1590398276),
(2, 'Learning', 'Learning related events', 1, 1590398289),
(3, 'Workshop', 'Workshop related events', 1, 1590398302),
(4, 'Entertainment', 'Entertainment related events', 1, 1590398316),
(5, 'Family', 'Family related events', 1, 1590398328),
(6, 'Fitness', 'Fitness related events', 1, 1590476475);

-- --------------------------------------------------------

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `active`, `auth_user`, `updated`) VALUES
(1, 'Do I need to get license an item each time I use it?', 'Yes you do. You need a license for each end project. This ensures contributors are paid for your usage of each asset & you and your clients have the legal right to use the item.', 'active', 1, 1590398072),
(2, 'When I use a font in Merchandising, must I combine with another asset?', 'No you do not. Fonts can be used on their own, so long as you do not redistribute the font itself to any other person.', 'active', 1, 1590398088),
(3, 'Can I use add-ons and other materials to create unique designs and sell them on t-shirts, mugs, cushions, etc?', 'Yes you can, as long as skill and effort have been applied to incorporate the items into a larger design and where the primary value of the product itself doesn’t lie in the item itself (for example, you can’t print an image out as a poster, as the primary value of the poster is from the image itself).', 'active', 1, 1590398108),
(4, 'Do I need to credit the author of the item?', 'No, it\'s not mandatory to give the author credit. But we do encourage that if your end product has credits as part of its design (such as a film or TV show), please credit the author and Envato. Also, as the author retains ownership of the item, you shouldn\'t claim copyright in the item.', 'active', 1, 1590398121),
(5, 'Can I use add-ons and other materials to create unique designs and sell them on t-shirts, mugs, cushions, etc?', 'Yes you can, as long as skill and effort have been applied to incorporate the items into a larger design and where the primary value of the product itself doesn’t lie in the item itself (for example, you can’t print an image out as a poster, as the primary value of the poster is from the image itself).', 'active', 1, 1590398242);

-- --------------------------------------------------------

--
-- Dumping data for table `follower`
--

INSERT INTO `follower` (`id`, `follower`, `followed`, `timestamp`, `auth_user`, `updated`) VALUES
(1, 1, 2, 1590398450, 1, 1590398450),
(2, 1, 3, 1590398451, 1, 1590398451),
(3, 1, 5, 1590398451, 1, 1590398451),
(4, 1, 6, 1590398452, 1, 1590398452),
(5, 1, 7, 1590398453, 1, 1590398453),
(6, 1, 8, 1590398453, 1, 1590398453),
(7, 1, 10, 1590398455, 1, 1590398455),
(8, 1, 11, 1590398455, 1, 1590398455),
(9, 2, 4, 1590398459, 1, 1590398459),
(10, 2, 5, 1590398460, 1, 1590398460),
(11, 2, 8, 1590398468, 1, 1590398468),
(12, 2, 9, 1590398469, 1, 1590398469),
(13, 2, 10, 1590398469, 1, 1590398469),
(14, 2, 11, 1590398470, 1, 1590398470),
(15, 2, 12, 1590398471, 1, 1590398471),
(16, 2, 15, 1590398474, 1, 1590398474),
(17, 3, 4, 1590398477, 1, 1590398477),
(18, 3, 2, 1590398478, 1, 1590398478),
(19, 3, 8, 1590398479, 1, 1590398479),
(20, 3, 9, 1590398480, 1, 1590398480),
(21, 3, 12, 1590398481, 1, 1590398481),
(22, 3, 13, 1590398482, 1, 1590398482),
(23, 3, 15, 1590398486, 1, 1590398486),
(24, 4, 13, 1590398506, 1, 1590398506),
(25, 4, 12, 1590398507, 1, 1590398507),
(26, 4, 10, 1590398508, 1, 1590398508),
(27, 4, 8, 1590398509, 1, 1590398509),
(28, 4, 3, 1590398510, 1, 1590398510),
(29, 4, 2, 1590398511, 1, 1590398511),
(30, 4, 1, 1590398518, 1, 1590398518),
(31, 7, 2, 1590398521, 1, 1590398521),
(32, 7, 3, 1590398521, 1, 1590398521),
(33, 7, 4, 1590398522, 1, 1590398522),
(34, 7, 6, 1590398523, 1, 1590398523),
(35, 7, 8, 1590398524, 1, 1590398524),
(36, 7, 11, 1590398525, 1, 1590398525),
(37, 7, 12, 1590398525, 1, 1590398525),
(38, 7, 15, 1590398527, 1, 1590398527),
(39, 7, 5, 1590398535, 1, 1590398535),
(40, 8, 1, 1590398539, 1, 1590398539),
(41, 8, 2, 1590398540, 1, 1590398540),
(42, 8, 4, 1590398541, 1, 1590398541),
(43, 8, 5, 1590398541, 1, 1590398541),
(44, 8, 10, 1590398543, 1, 1590398543),
(45, 8, 11, 1590398543, 1, 1590398543),
(46, 8, 13, 1590398544, 1, 1590398544),
(47, 8, 14, 1590398544, 1, 1590398544),
(48, 9, 3, 1590398549, 1, 1590398549),
(49, 9, 4, 1590398550, 1, 1590398550),
(50, 9, 6, 1590398551, 1, 1590398551),
(51, 9, 7, 1590398551, 1, 1590398551),
(52, 9, 12, 1590398563, 1, 1590398563),
(53, 9, 13, 1590398563, 1, 1590398563),
(54, 9, 14, 1590398564, 1, 1590398564),
(55, 10, 5, 1590398570, 1, 1590398570),
(56, 10, 6, 1590398571, 1, 1590398571),
(57, 10, 8, 1590398571, 1, 1590398571),
(58, 10, 9, 1590398572, 1, 1590398572),
(59, 10, 12, 1590398573, 1, 1590398573),
(60, 10, 15, 1590398574, 1, 1590398574),
(61, 11, 4, 1590398579, 1, 1590398579),
(62, 11, 5, 1590398580, 1, 1590398580),
(63, 11, 6, 1590398580, 1, 1590398580),
(64, 11, 10, 1590398581, 1, 1590398581),
(65, 11, 15, 1590398582, 1, 1590398582),
(66, 11, 3, 1590398584, 1, 1590398584),
(67, 11, 1, 1590398591, 1, 1590398591),
(68, 13, 2, 1590398594, 1, 1590398594),
(69, 13, 3, 1590398595, 1, 1590398595),
(70, 13, 6, 1590398596, 1, 1590398596),
(71, 13, 5, 1590398596, 1, 1590398596),
(72, 13, 8, 1590398597, 1, 1590398597),
(73, 13, 9, 1590398598, 1, 1590398598),
(74, 13, 11, 1590398598, 1, 1590398598),
(75, 13, 14, 1590398603, 1, 1590398603),
(76, 13, 15, 1590398604, 1, 1590398604),
(77, 14, 2, 1590398609, 1, 1590398609),
(78, 14, 3, 1590398610, 1, 1590398610),
(79, 14, 7, 1590398611, 1, 1590398611),
(80, 14, 6, 1590398611, 1, 1590398611),
(81, 14, 11, 1590398613, 1, 1590398613),
(82, 14, 15, 1590398615, 1, 1590398615),
(83, 14, 5, 1590398618, 1, 1590398618),
(84, 14, 4, 1590398619, 1, 1590398619),
(85, 15, 2, 1590398623, 1, 1590398623),
(86, 15, 4, 1590398623, 1, 1590398623),
(87, 15, 6, 1590398624, 1, 1590398624),
(88, 15, 9, 1590398626, 1, 1590398626),
(89, 15, 12, 1590398627, 1, 1590398627),
(90, 15, 14, 1590398629, 1, 1590398629),
(91, 15, 10, 1590398631, 1, 1590398631),
(92, 15, 3, 1590398635, 1, 1590398635),
(93, 12, 2, 1590398646, 1, 1590398646),
(94, 12, 3, 1590398646, 1, 1590398646),
(95, 12, 6, 1590398647, 1, 1590398647),
(96, 12, 7, 1590398648, 1, 1590398648),
(97, 12, 9, 1590398649, 1, 1590398649),
(98, 12, 8, 1590398649, 1, 1590398649),
(99, 12, 14, 1590398650, 1, 1590398650),
(100, 5, 4, 1590398667, 1, 1590398667),
(101, 5, 3, 1590398668, 1, 1590398668),
(102, 5, 2, 1590398669, 1, 1590398669),
(103, 5, 8, 1590398670, 1, 1590398670),
(104, 5, 10, 1590398671, 1, 1590398671),
(105, 5, 14, 1590398672, 1, 1590398672),
(106, 5, 15, 1590398673, 1, 1590398673),
(107, 6, 2, 1590398678, 1, 1590398678),
(108, 6, 3, 1590398678, 1, 1590398678),
(109, 6, 4, 1590398679, 1, 1590398679),
(110, 6, 10, 1590398680, 1, 1590398680),
(111, 6, 14, 1590398682, 1, 1590398682),
(112, 6, 1, 1590398689, 1, 1590398689),
(113, 6, 7, 1590398690, 1, 1590398690),
(114, 10, 2, 1590398704, 1, 1590398704),
(115, 10, 1, 1590398705, 1, 1590398705),
(116, 1, 14, 1590398728, 1, 1590398728),
(117, 1, 15, 1590398729, 1, 1590398729);

-- --------------------------------------------------------

--
-- Dumping data for table `friend`
--

INSERT INTO `friend` (`id`, `friendby`, `friendto`, `status`, `timestamp`, `auth_user`, `updated`) VALUES
(2, 1, 3, 'accept', 1590398922, 1, 1590399065),
(3, 1, 5, 'accept', 1590398923, 1, 1590399070),
(4, 1, 7, 'accept', 1590398924, 1, 1590399094),
(5, 1, 8, 'accept', 1590398924, 1, 1590399107),
(6, 1, 10, 'accept', 1590398925, 1, 1590399111),
(7, 1, 12, 'accept', 1590398926, 1, 1590399120),
(8, 1, 13, 'accept', 1590398927, 1, 1590399125),
(9, 1, 15, 'accept', 1590398928, 1, 1590399133),
(10, 2, 3, 'accept', 1590398938, 1, 1590399065),
(11, 2, 4, 'accept', 1590398939, 1, 1590399081),
(12, 2, 5, 'accept', 1590398939, 1, 1590399070),
(13, 2, 8, 'accept', 1590398940, 1, 1590399107),
(14, 2, 7, 'accept', 1590398941, 1, 1590399094),
(15, 2, 11, 'accept', 1590398942, 1, 1590399116),
(16, 2, 12, 'accept', 1590398942, 1, 1590399120),
(17, 2, 15, 'accept', 1590398944, 1, 1590399133),
(18, 3, 4, 'accept', 1590398948, 1, 1590399081),
(19, 3, 5, 'accept', 1590398949, 1, 1590399070),
(20, 3, 8, 'accept', 1590398950, 1, 1590399107),
(21, 3, 9, 'accept', 1590398950, 1, 1590399162),
(22, 3, 12, 'accept', 1590398951, 1, 1590399120),
(23, 3, 14, 'accept', 1590399032, 1, 1590399032),
(24, 4, 8, 'accept', 1590398957, 1, 1590399107),
(25, 4, 7, 'accept', 1590398957, 1, 1590399094),
(26, 4, 11, 'accept', 1590398958, 1, 1590399116),
(27, 4, 12, 'accept', 1590398958, 1, 1590399120),
(28, 4, 15, 'accept', 1590398960, 1, 1590399133),
(29, 4, 14, 'accept', 1590399026, 1, 1590399026),
(30, 5, 8, 'accept', 1590398964, 1, 1590399107),
(31, 5, 7, 'accept', 1590398964, 1, 1590399094),
(32, 5, 12, 'accept', 1590398965, 1, 1590399120),
(33, 5, 11, 'accept', 1590398966, 1, 1590399116),
(34, 5, 14, 'accept', 1590399027, 1, 1590399027),
(35, 5, 13, 'accept', 1590398967, 1, 1590399125),
(36, 6, 1, 'accept', 1590398971, 1, 1590399053),
(37, 6, 2, 'accept', 1590398972, 1, 1590399057),
(38, 6, 3, 'accept', 1590398973, 1, 1590399065),
(39, 6, 8, 'accept', 1590398974, 1, 1590399107),
(40, 6, 7, 'accept', 1590398974, 1, 1590399094),
(41, 6, 5, 'accept', 1590398975, 1, 1590399070),
(42, 6, 13, 'accept', 1590398976, 1, 1590399125),
(43, 6, 15, 'accept', 1590398977, 1, 1590399133),
(44, 7, 11, 'accept', 1590398987, 1, 1590399116),
(45, 7, 12, 'accept', 1590398987, 1, 1590399120),
(46, 7, 13, 'accept', 1590398988, 1, 1590399125),
(47, 7, 15, 'accept', 1590398989, 1, 1590399133),
(48, 8, 12, 'accept', 1590398994, 1, 1590399120),
(49, 8, 13, 'accept', 1590398994, 1, 1590399125),
(50, 8, 14, 'accept', 1590398995, 1, 1590399129),
(51, 9, 8, 'accept', 1590398999, 1, 1590399107),
(52, 9, 7, 'accept', 1590398999, 1, 1590399094),
(53, 9, 6, 'accept', 1590399000, 1, 1590399089),
(54, 9, 14, 'accept', 1590399001, 1, 1590399129),
(55, 9, 13, 'accept', 1590399001, 1, 1590399125),
(56, 10, 5, 'accept', 1590399005, 1, 1590399070),
(57, 10, 6, 'accept', 1590399005, 1, 1590399089),
(58, 10, 7, 'accept', 1590399006, 1, 1590399094),
(59, 10, 12, 'accept', 1590399007, 1, 1590399120),
(60, 10, 11, 'accept', 1590399007, 1, 1590399116),
(61, 10, 15, 'accept', 1590399008, 1, 1590399133),
(62, 11, 14, 'accept', 1590399013, 1, 1590399129),
(63, 11, 13, 'accept', 1590399013, 1, 1590399125),
(64, 12, 14, 'accept', 1590399018, 1, 1590399129),
(65, 13, 10, 'accept', 1590399022, 1, 1590399111),
(66, 14, 13, 'accept', 1590399030, 1, 1590399125),
(67, 14, 2, 'accept', 1590399032, 1, 1590399057),
(68, 14, 6, 'accept', 1590399034, 1, 1590399089),
(69, 15, 3, 'accept', 1590399038, 1, 1590399065),
(70, 15, 11, 'accept', 1590399039, 1, 1590399116),
(71, 15, 14, 'accept', 1590399040, 1, 1590399129),
(72, 15, 13, 'accept', 1590399040, 1, 1590399125),
(73, 1, 2, 'accept', 1590474052, 1, 1590474052);

-- --------------------------------------------------------

--
-- Dumping data for table `mails`
--

INSERT INTO `mails` (`id`, `title`, `from_user_id`, `to_user_id`, `message`, `attachment`, `parent_id`, `thread_id`, `star`, `thread_star`, `trash`, `thread_trash`, `status`, `mark_read`, `thread_mark_read`, `mail_category`, `timestamp`, `thread_updated`, `updated`, `auth_user`) VALUES
(1, 'Business Proposal', 1, 2, '<p>Hello, A new business proposal for you. Lets get in touch..</p>\\n<p>Let know if you are willing to work on</p>\\n', '', 0, 1, '|1:1||2:1|', '|1:3||2:3|', '', '', 'send', '|1:1|', '|1:3|', '', 1590476806, 1590476873, 1590477730, 1),
(2, 'Business Proposal', 2, 1, '<p>Yes. Please share some details</p>\\n', '', 1, 1, '|1:1||2:1|', '', '', '', 'send', '|1:1|', '', '', 1590476848, 0, 1590477730, 1),
(3, 'Business Proposal', 1, 2, '<p>Please find some attachemnts below</p>\\n', '210,211,', 2, 1, '|1:1||2:1|', '', '', '', 'send', '|1:1|', '', '', 1590476872, 0, 1590477730, 1),
(4, 'Hi Wassup', 1, 5, '<p>Hello,</p>\\n<p>Hope you are well. Please get back soon for new proposals.</p>\\n', '', 0, 4, '|5:1|', '|5:2|', '', '', 'send', '0|1:1|', '|1:1|', '', 1590476939, 1590477078, 1590477727, 1),
(5, 'We know you’ve been cooking everyday', 1, 7, '<p>Please share your details with us.</p>\\n<p>thank you</p>\\n', '', 0, 5, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477057, 1590477057, 1590477087, 1),
(6, 'Hi Wassup', 5, 1, '<p>Ofcourse</p>\\n', '', 4, 4, '|5:1|', '', '', '', 'send', '0', '', '', 1590477078, 0, 1590477727, 1),
(7, 'Limited time discount on Support Suite', 1, 4, '<p>We all know the world is going through some pretty dramatic changes right now and everyone is trying to adapt quickly to a new reality with many unexpected challenges.&nbsp;</p>\\n', '', 0, 7, '', '', '', '', 'send', '0', '', '', 1590477171, 1590477171, 1590477171, 1),
(8, 'Limited time discount on Support Suite', 1, 3, '<p>We all know the world is going through some pretty dramatic changes right now and everyone is trying to adapt quickly to a new reality with many unexpected challenges.&nbsp;</p>\\n', '', 0, 8, '', '', '', '', 'send', '0', '', '', 1590477173, 1590477173, 1590477173, 1),
(9, 'Build your UX/UI skills in nine days', 1, 6, '<p>Sharpen your Adobe XD skills with the Daily Creative Challenge. Great projects, simple instructions, and live tutorials mean there are so many ways to connect with your design community.&nbsp;</p>\\n', '', 0, 9, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477238, 1590477694, 1590477694, 1),
(10, 'Sharpen your skills with the Daily Creative Challenge', 1, 7, '<p>Sharpen your Adobe XD skills with the Daily Creative Challenge. Great projects, simple instructions, and live tutorials mean there are so many ways to connect with your design community.&nbsp;</p>\\n', '', 0, 10, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477258, 1590477662, 1590477662, 1),
(11, 'Voyage 2020 sessions curated just for you!', 1, 9, '<p>When it comes to mangoes, we all have our favourite varieties. But India has a mind-boggling number of varieties and each looks, smells and tastes different. Here’s a cheat sheet to help you pick</p>\\n', '', 0, 11, '|9:1|', '|9:2|', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477480, 1590477689, 1590477723, 1),
(12, 'Voyage 2020 sessions curated just for you!', 1, 8, '<p>Voyage 2020 was truly a journey of learning and growth, thanks to our esteemed speakers and their insights and valuable pearls of wisdom.</p>\\n<p>To ensure that you don’t miss out on the knowledge shared in the sessions, we have curated a day-wise recording of every session so that you can replay them.</p>\\n', '', 0, 12, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477482, 1590477659, 1590477659, 1),
(13, 'Financial planning beyond', 1, 10, '<p>Voyage 2020 was truly a journey of learning and growth, thanks to our esteemed speakers and their insights and valuable pearls of wisdom.</p>\\n<p>To ensure that you don’t miss out on the knowledge shared in the sessions, we have curated a day-wise recording of every session so that you can replay them.</p>\\n', '', 0, 13, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477488, 1590477686, 1590477686, 1),
(14, 'Financial beyond steps', 1, 11, '<p>Voyage 2020 was truly a journey of learning and growth, thanks to our esteemed speakers and their insights and valuable pearls of wisdom.</p>\\n<p>To ensure that you don’t miss out on the knowledge shared in the sessions, we have curated a day-wise recording of every session so that you can replay them.</p>\\n', '', 0, 14, '|11:1|', '|11:2|', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477490, 1590477683, 1590477734, 1),
(15, 'Voyage 2020 sessions curated just for you!', 1, 12, '<p>When it comes to mangoes, we all have our favourite varieties. But India has a mind-boggling number of varieties and each looks, smells and tastes different. Here’s a cheat sheet to help you pick</p>\\n', '', 0, 15, '', '', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477493, 1590477666, 1590477666, 1),
(16, 'Financial planning beyond', 1, 13, '<p>Voyage 2020 was truly a journey of learning and growth, thanks to our esteemed speakers and their insights and valuable pearls of wisdom.</p>\\n<p>To ensure that you don’t miss out on the knowledge shared in the sessions, we have curated a day-wise recording of every session so that you can replay them.</p>\\n', '', 0, 16, '', '', '', '', 'send', '|1:1|', '|1:2|', '', 1590477496, 1590477700, 1590477774, 1),
(17, 'Happy Monday – Download 6 New Free Goods', 1, 14, '<p>When it comes to mangoes, we all have our favourite varieties. But India has a mind-boggling number of varieties and each looks, smells and tastes different. Here’s a cheat sheet to help you pick</p>\\n', '', 0, 17, '|14:1|', '|14:2|', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477498, 1590477654, 1590477737, 1),
(18, 'Download New Free Goods', 1, 15, '<p>An interesting look into how sleep habits are changing—plus more immunity-boosting ideas to power your week.</p>\\n', '', 0, 18, '|15:1|', '|15:2|', '', '', 'send', '0|1:1|', '|1:1|', '', 1590477500, 1590477652, 1590477740, 1),
(19, 'Download New Free Goods', 15, 1, '<p>Okay, designers—this is it. You found the perfect job. You’ve put together a knockout portfolio. You’ve submitted your application, and you’ve moved on to the next step—the interview.</p>\\n', '', 18, 18, '|15:1|', '', '', '', 'send', '0', '', '', 1590477652, 0, 1590477740, 1),
(20, 'Happy Monday – Download 6 New Free Goods', 14, 1, '<p>Okay, designers—this is it. You found the perfect job. You’ve put together a knockout portfolio. You’ve submitted your application, and you’ve moved on to the next step—the interview.</p>\\n', '', 17, 17, '|14:1|', '', '', '', 'send', '0', '', '', 1590477654, 0, 1590477737, 1),
(21, 'Voyage 2020 sessions curated just for you!', 8, 1, '<p>Okay, designers—this is it. You found the perfect job. You’ve put together a knockout portfolio. You’ve submitted your application, and you’ve moved on to the next step—the interview.</p>\\n', '', 12, 12, '', '', '', '', 'send', '0', '', '', 1590477659, 0, 1590477659, 1),
(22, 'Sharpen your skills with the Daily Creative Challenge', 7, 1, '<p>Okay, designers—this is it. You found the perfect job. You’ve put together a knockout portfolio. You’ve submitted your application, and you’ve moved on to the next step—the interview.</p>\\n', '', 10, 10, '', '', '', '', 'send', '0', '', '', 1590477662, 0, 1590477662, 1),
(23, 'Voyage 2020 sessions curated just for you!', 12, 1, '<p>Okay, designers—this is it. You found the perfect job. You’ve put together a knockout portfolio. You’ve submitted your application, and you’ve moved on to the next step—the interview.</p>\\n', '', 15, 15, '', '', '', '', 'send', '0', '', '', 1590477666, 0, 1590477666, 1),
(24, 'Financial beyond steps', 11, 1, '<p>While this seems like a daunting challenge, breathe—you’ve got this. The good news is that you can prepare to meet this career challenge head-on. Over on the Dribbble blog we were joined to Carl Wheatley, Product Design Recruiter at Facebook, who shares with us his actionable steps for sidestepping potential pitfalls when it comes to the interview process.</p>\\n', '', 14, 14, '|11:1|', '', '', '', 'send', '0', '', '', 1590477683, 0, 1590477734, 1),
(25, 'Financial planning beyond', 10, 1, '<p>While this seems like a daunting challenge, breathe—you’ve got this. The good news is that you can prepare to meet this career challenge head-on. Over on the Dribbble blog we were joined to Carl Wheatley, Product Design Recruiter at Facebook, who shares with us his actionable steps for sidestepping potential pitfalls when it comes to the interview process.</p>\\n', '', 13, 13, '', '', '', '', 'send', '0', '', '', 1590477686, 0, 1590477686, 1),
(26, 'Voyage 2020 sessions curated just for you!', 9, 1, '<p>While this seems like a daunting challenge, breathe—you’ve got this. The good news is that you can prepare to meet this career challenge head-on. Over on the Dribbble blog we were joined to Carl Wheatley, Product Design Recruiter at Facebook, who shares with us his actionable steps for sidestepping potential pitfalls when it comes to the interview process.</p>\\n', '', 11, 11, '|9:1|', '', '', '', 'send', '0', '', '', 1590477689, 0, 1590477722, 1),
(27, 'Build your UX/UI skills in nine days', 6, 1, '<p>While this seems like a daunting challenge, breathe—you’ve got this. The good news is that you can prepare to meet this career challenge head-on. Over on the Dribbble blog we were joined to Carl Wheatley, Product Design Recruiter at Facebook, who shares with us his actionable steps for sidestepping potential pitfalls when it comes to the interview process.</p>\\n', '', 9, 9, '', '', '', '', 'send', '0', '', '', 1590477694, 0, 1590477694, 1),
(28, 'Financial planning beyond', 13, 1, '<p>While this seems like a daunting challenge, breathe—you’ve got this. The good news is that you can prepare to meet this career challenge head-on. Over on the Dribbble blog we were joined to Carl Wheatley, Product Design Recruiter at Facebook, who shares with us his actionable steps for sidestepping potential pitfalls when it comes to the interview process.</p>\\n', '', 16, 16, '', '', '', '', 'send', '0|1:1|', '', '', 1590477700, 0, 1590477774, 1);

-- --------------------------------------------------------

--
-- Dumping data for table `mail_categories`
--
INSERT INTO `mail_categories` (`id`, `name`, `slug`, `brief`, `auth_user`, `updated`) VALUES
(1, 'Business', 'business', 'business mails', 1, 1590841312),
(2, 'Family', 'family', 'Family mails', 1, 1590841326),
(3, 'Work', 'work', 'Work mails', 1, 1590841343),
(4, 'Promotion', 'promotion', 'promotion mails', 1, 1590841363);

-- --------------------------------------------------------
--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `name`, `brief`, `location`, `attachment`, `cover_image`, `user_id`, `column_class`, `fullwidth`, `circular`, `equal_height`, `display_type`, `display_content`, `carousel_align`, `carousel_column`, `carousel_height`, `active`, `auth_user`, `updated`) VALUES
(1, 'Single Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 0, 1, 's12', 0, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421087),
(2, 'Full Width Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 91, 1, 's12', 1, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421810),
(3, 'Grid 2 Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 92, 1, 's6', 0, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421816),
(4, 'Grid 3 Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 93, 1, 's4', 0, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421863),
(5, 'Full Width 2 Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 94, 1, 's6', 1, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421860),
(6, 'Full Width 3 Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 95, 1, 's4', 1, 0, 0, 'grid', 'none', '', '', '', 1, 1, 1590421856),
(7, 'Full Width With Content Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 96, 1, 's12', 1, 0, 0, 'grid', 'showcontent', '', '', '', 1, 1, 1590421854),
(8, 'Grid 2 Column Content Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 97, 1, 's6', 0, 0, 1, 'grid', 'showcontent', '', '', '', 1, 1, 1590421852),
(9, 'Full Width with Title Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 98, 1, 's12', 1, 0, 0, 'grid', 'showtitle', '', '', '', 1, 1, 1590421850),
(10, 'Grid 2 Column with Title Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 90, 1, 's6', 0, 1, 0, 'grid', 'showtitle', '', '', '', 1, 1, 1590421849),
(11, 'Masonry 2 Column Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 109, 1, 's6', 0, 0, 0, 'masonry', 'none', '', '', '', 1, 1, 1590422468),
(12, 'Masonry 3 Column Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 113, 1, 's4', 0, 0, 0, 'masonry', 'none', '', '', '', 1, 1, 1590422465),
(13, 'Full Width Masonry 2 Column Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 114, 1, 's6', 1, 0, 0, 'masonry', 'none', '', '', '', 1, 1, 1590422463),
(14, 'Full Width Masonry 3 Column Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 116, 1, 's4', 1, 0, 0, 'masonry', 'none', '', '', '', 1, 1, 1590422459),
(15, 'Masonry 2 Column with Content Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 119, 1, 's6', 0, 0, 0, 'masonry', 'showcontent', '', '', '', 1, 1, 1590422457),
(16, 'Masonry 2 Column with Title Portfolio', '', 'India', ',108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,', 121, 1, 's6', 0, 0, 0, 'masonry', 'showtitle', '', '', '', 1, 1, 1590422454),
(17, 'Circular with Content Portfolio', '', 'India', ',99,100,101,102,103,104,105,106,107,', 102, 1, 's12', 0, 1, 0, 'grid', 'showcontent', '', '', '', 1, 1, 1590422581),
(18, 'Circular 2 column Portfolio', '', 'India', ',99,100,101,102,103,104,105,106,107,', 104, 1, 's6', 0, 1, 0, 'grid', 'none', '', '', '', 1, 1, 1590422673),
(19, 'Circular 3 column Portfolio', '', 'India', ',99,100,101,102,103,104,105,106,107,', 106, 1, 's4', 0, 1, 0, 'grid', 'none', '', '', '', 1, 1, 1590422677),
(20, 'Carousel Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 91, 1, 's12', 0, 0, 0, 'carousel', 'none', 'center-align', 'single', '500px', 1, 1, 1590422832),
(21, 'Carousel Multi Column Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 92, 1, 's12', 0, 0, 0, 'carousel', 'none', 'center-align', 'multi', '300px', 1, 1, 1590423017),
(22, 'Carousel with content Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 94, 1, 's12', 0, 0, 0, 'carousel', 'showcontent', 'center-align', 'single', '500px', 1, 1, 1590423015),
(23, 'Carousel with title Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 0, 1, 's12', 0, 0, 0, 'carousel', 'showtitle', 'center-align', 'single', '500px', 1, 1, 1590422920),
(24, 'Carousel Multi Column Full Width Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 93, 1, 's12', 1, 0, 0, 'carousel', 'none', 'center-align', 'multi', '300px', 1, 1, 1590423239),
(25, 'Carousel Left Align content Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 98, 1, 's12', 0, 0, 0, 'carousel', 'showcontent', 'left-align', 'single', '500px', 1, 1, 1590423224),
(26, 'Carousel Right Align content Portfolio', '', 'India', ',90,91,92,93,94,95,96,97,98,', 90, 1, 's12', 0, 0, 0, 'carousel', 'showcontent', 'right-align', 'single', '500px', 1, 1, 1590423221);

-- --------------------------------------------------------

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `position`, `gender`, `image`, `auth_user`, `updated`) VALUES
(1, 'Jane Parker', 'Sr. Engg.', 'Female', '1', 1, 1590390573),
(2, 'John Doug', 'CEO', 'Male', '2', 1, 1590390694),
(3, 'Arthur Coots', 'Developer', 'Male', '3', 1, 1590390727),
(4, 'Milly Rexford', 'Sales Head', 'Female', '4', 1, 1590390767),
(5, 'Denwer Jean', 'Designer', 'Female', '5', 1, 1590390795),
(6, 'Karl Butler', 'Marketing Head', 'Male', '6', 1, 1590390813),
(7, 'John Nelson', 'UI Head', 'Male', '7', 1, 1590390838),
(8, 'Carol Blake', 'Editor', 'Female', '8', 1, 1590390866);

-- --------------------------------------------------------

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `position`, `message`, `image`, `auth_user`, `updated`) VALUES
(1, 'Simona Gotto', 'CEO, Ink Media Ltd.', 'We are so pleased with the purchase of this product. Zak has tons of components and features to deal with. You can really create anything you like.', '9', 1, 1590391017),
(2, 'Kai Badger', 'Sr. Designer', 'A perfect template to get you going for your next project. A full loaded feature packed template. It is multi purpose and super fast. Thank you for such a wonderful app', '10', 1, 1590391072),
(3, 'Brooks Larson', 'Sr. Developer', 'We highly recommend using Zak for your next project. It is super quality and premium template that you can ask for. Just go for it.', '11', 1, 1590391121),
(4, 'Harry Bower', 'CTO, Tech Dev. Ind.', 'Zak is not just any app but bundle of apps. Zak is fully loaded feature packed app. It is multi purpose and super fast. Thank you for such a wonderful work', '12', 1, 1590391242);

-- --------------------------------------------------------

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`id`, `name`, `title`, `brief`, `module`, `module_id`, `type`, `size`, `thumb`, `small`, `auth_user`, `updated`) VALUES
(1, 'uploads/team-1.jpg', '', '', 'team', 1, 'image/jpeg', 153168, 'uploads/thumb-team-1.jpg', 'uploads/small-team-1.jpg', 1, 1590390573),
(2, 'uploads/team-2.jpg', '', '', 'team', 2, 'image/jpeg', 74830, 'uploads/thumb-team-2.jpg', 'uploads/small-team-2.jpg', 1, 1590390694),
(3, 'uploads/team-3.jpg', '', '', 'team', 3, 'image/jpeg', 83710, 'uploads/thumb-team-3.jpg', 'uploads/small-team-3.jpg', 1, 1590390727),
(4, 'uploads/team-4.jpg', '', '', 'team', 4, 'image/jpeg', 111197, 'uploads/thumb-team-4.jpg', 'uploads/small-team-4.jpg', 1, 1590390768),
(5, 'uploads/team-5.jpg', '', '', 'team', 5, 'image/jpeg', 127381, 'uploads/thumb-team-5.jpg', 'uploads/small-team-5.jpg', 1, 1590390795),
(6, 'uploads/team-6.jpg', '', '', 'team', 6, 'image/jpeg', 111524, 'uploads/thumb-team-6.jpg', 'uploads/small-team-6.jpg', 1, 1590390813),
(7, 'uploads/team-7.jpg', '', '', 'team', 7, 'image/jpeg', 155737, 'uploads/thumb-team-7.jpg', 'uploads/small-team-7.jpg', 1, 1590390838),
(8, 'uploads/team-8.jpg', '', '', 'team', 8, 'image/jpeg', 96475, 'uploads/thumb-team-8.jpg', 'uploads/small-team-8.jpg', 1, 1590390867),
(9, 'uploads/user-5.jpg', '', '', 'testimonial', 1, 'image/jpeg', 25874, 'uploads/thumb-user-5.jpg', 'uploads/small-user-5.jpg', 1, 1590391017),
(10, 'uploads/user-14.jpg', '', '', 'testimonial', 2, 'image/jpeg', 18446, 'uploads/thumb-user-14.jpg', 'uploads/small-user-14.jpg', 1, 1590391072),
(11, 'uploads/user-2.jpg', '', '', 'testimonial', 3, 'image/jpeg', 18910, 'uploads/thumb-user-2.jpg', 'uploads/small-user-2.jpg', 1, 1590391121),
(12, 'uploads/user-26.jpg', '', '', 'testimonial', 4, 'image/jpeg', 18285, 'uploads/thumb-user-26.jpg', 'uploads/small-user-26.jpg', 1, 1590391242),
(13, 'uploads/client-1.png', '', '', 'client', 1, 'image/png', 1737, 'uploads/thumb-client-1.png', 'uploads/small-client-1.png', 1, 1590391478),
(14, 'uploads/client-3.png', '', '', 'client', 2, 'image/png', 1440, 'uploads/thumb-client-3.png', 'uploads/small-client-3.png', 1, 1590391510),
(15, 'uploads/client-2.png', '', '', 'client', 3, 'image/png', 1473, 'uploads/thumb-client-2.png', 'uploads/small-client-2.png', 1, 1590391567),
(16, 'uploads/client-4.png', '', '', 'client', 4, 'image/png', 2305, 'uploads/thumb-client-4.png', 'uploads/small-client-4.png', 1, 1590391598),
(17, 'uploads/client-1.png', '', '', 'client', 5, 'image/png', 1737, 'uploads/thumb-client-1.png', 'uploads/small-client-1.png', 1, 1590391641),
(18, 'uploads/client-5.png', '', '', 'client', 5, 'image/png', 31567, 'uploads/thumb-client-5.png', 'uploads/small-client-5.png', 1, 1590391698),
(19, 'uploads/client-6.jpg', '', '', 'client', 6, 'image/jpeg', 24055, 'uploads/thumb-client-6.jpg', 'uploads/small-client-6.jpg', 1, 1590391797),
(20, 'uploads/client-6.png', '', '', 'client', 6, 'image/png', 207896, 'uploads/thumb-client-6.png', 'uploads/small-client-6.png', 1, 1590391840),
(21, 'uploads/client-7.png', '', '', 'client', 7, 'image/png', 188507, 'uploads/thumb-client-7.png', 'uploads/small-client-7.png', 1, 1590391908),
(22, 'uploads/client-8.png', '', '', 'client', 8, 'image/png', 5970, 'uploads/thumb-client-8.png', 'uploads/small-client-8.png', 1, 1590391958),
(26, 'uploads/_0000_profile.jpg', '', '', 'user', 0, 'image/jpeg', 321840, 'uploads/thumb-_0000_profile.jpg', 'uploads/small-_0000_profile.jpg', 1, 1590394446),
(27, 'uploads/_0001_profile.jpg', '', '', 'user', 0, 'image/jpeg', 218132, 'uploads/thumb-_0001_profile.jpg', 'uploads/small-_0001_profile.jpg', 1, 1590394446),
(28, 'uploads/_0002_profile.jpg', '', '', 'user', 0, 'image/jpeg', 415868, 'uploads/thumb-_0002_profile.jpg', 'uploads/small-_0002_profile.jpg', 1, 1590394446),
(29, 'uploads/_0003_profile.jpg', '', '', 'user', 0, 'image/jpeg', 287324, 'uploads/thumb-_0003_profile.jpg', 'uploads/small-_0003_profile.jpg', 1, 1590394446),
(30, 'uploads/_0004_profile.jpg', '', '', 'user', 0, 'image/jpeg', 271949, 'uploads/thumb-_0004_profile.jpg', 'uploads/small-_0004_profile.jpg', 1, 1590394446),
(31, 'uploads/_0005_profile.jpg', '', '', 'user', 1, 'image/jpeg', 273652, 'uploads/thumb-_0005_profile.jpg', 'uploads/small-_0005_profile.jpg', 1, 1590394446),
(32, 'uploads/_0006_profile.jpg', '', '', 'user', 16, 'image/jpeg', 303265, 'uploads/thumb-_0006_profile.jpg', 'uploads/small-_0006_profile.jpg', 1, 1590395108),
(33, 'uploads/_0007_profile.jpg', '', '', 'user', 0, 'image/jpeg', 162140, 'uploads/thumb-_0007_profile.jpg', 'uploads/small-_0007_profile.jpg', 1, 1590394446),
(34, 'uploads/_0008_profile.jpg', '', '', 'user', 0, 'image/jpeg', 138278, 'uploads/thumb-_0008_profile.jpg', 'uploads/small-_0008_profile.jpg', 1, 1590394446),
(35, 'uploads/_0009_profile.jpg', '', '', 'user', 0, 'image/jpeg', 298250, 'uploads/thumb-_0009_profile.jpg', 'uploads/small-_0009_profile.jpg', 1, 1590394446),
(36, 'uploads/_0010_profile.jpg', '', '', 'user', 0, 'image/jpeg', 171582, 'uploads/thumb-_0010_profile.jpg', 'uploads/small-_0010_profile.jpg', 1, 1590394446),
(37, 'uploads/_0011_profile.jpg', '', '', 'user', 0, 'image/jpeg', 217723, 'uploads/thumb-_0011_profile.jpg', 'uploads/small-_0011_profile.jpg', 1, 1590394446),
(38, 'uploads/_0012_profile.jpg', '', '', 'user', 0, 'image/jpeg', 204912, 'uploads/thumb-_0012_profile.jpg', 'uploads/small-_0012_profile.jpg', 1, 1590394446),
(39, 'uploads/_0013_profile.jpg', '', '', 'user', 0, 'image/jpeg', 276953, 'uploads/thumb-_0013_profile.jpg', 'uploads/small-_0013_profile.jpg', 1, 1590394446),
(40, 'uploads/_0014_profile.jpg', '', '', 'user', 0, 'image/jpeg', 200247, 'uploads/thumb-_0014_profile.jpg', 'uploads/small-_0014_profile.jpg', 1, 1590394446),
(41, 'uploads/user-6.jpg', '', '', 'contact', 1, 'image/jpeg', 24082, 'uploads/thumb-user-6.jpg', 'uploads/small-user-6.jpg', 1, 1590396355),
(42, 'uploads/user-15.jpg', '', '', 'contact', 2, 'image/jpeg', 18079, 'uploads/thumb-user-15.jpg', 'uploads/small-user-15.jpg', 1, 1590396523),
(43, 'uploads/user-1.jpg', '', '', 'contact', 3, 'image/jpeg', 23043, 'uploads/thumb-user-1.jpg', 'uploads/small-user-1.jpg', 1, 1590397184),
(44, 'uploads/user-3.jpg', '', '', 'contact', 4, 'image/jpeg', 19239, 'uploads/thumb-user-3.jpg', 'uploads/small-user-3.jpg', 1, 1590397184),
(45, 'uploads/user-4.jpg', '', '', 'contact', 5, 'image/jpeg', 18228, 'uploads/thumb-user-4.jpg', 'uploads/small-user-4.jpg', 1, 1590397184),
(46, 'uploads/user-7.jpg', '', '', 'contact', 6, 'image/jpeg', 15917, 'uploads/thumb-user-7.jpg', 'uploads/small-user-7.jpg', 1, 1590397184),
(47, 'uploads/user-8.jpg', '', '', 'contact', 7, 'image/jpeg', 18705, 'uploads/thumb-user-8.jpg', 'uploads/small-user-8.jpg', 1, 1590397184),
(48, 'uploads/user-9.jpg', '', '', 'contact', 8, 'image/jpeg', 15207, 'uploads/thumb-user-9.jpg', 'uploads/small-user-9.jpg', 1, 1590397184),
(49, 'uploads/user-10.jpg', '', '', 'contact', 9, 'image/jpeg', 16117, 'uploads/thumb-user-10.jpg', 'uploads/small-user-10.jpg', 1, 1590397184),
(50, 'uploads/user-11.jpg', '', '', 'contact', 10, 'image/jpeg', 16934, 'uploads/thumb-user-11.jpg', 'uploads/small-user-11.jpg', 1, 1590397184),
(51, 'uploads/user-12.jpg', '', '', 'contact', 11, 'image/jpeg', 16128, 'uploads/thumb-user-12.jpg', 'uploads/small-user-12.jpg', 1, 1590397184),
(52, 'uploads/user-13.jpg', '', '', 'contact', 12, 'image/jpeg', 24984, 'uploads/thumb-user-13.jpg', 'uploads/small-user-13.jpg', 1, 1590397184),
(53, 'uploads/user-16.jpg', '', '', 'contact', 13, 'image/jpeg', 15490, 'uploads/thumb-user-16.jpg', 'uploads/small-user-16.jpg', 1, 1590397184),
(54, 'uploads/user-17.jpg', '', '', 'contact', 14, 'image/jpeg', 18527, 'uploads/thumb-user-17.jpg', 'uploads/small-user-17.jpg', 1, 1590397184),
(55, 'uploads/user-18.jpg', '', '', 'contact', 15, 'image/jpeg', 16278, 'uploads/thumb-user-18.jpg', 'uploads/small-user-18.jpg', 1, 1590397184),
(56, 'uploads/user-19.jpg', '', '', 'contact', 16, 'image/jpeg', 14798, 'uploads/thumb-user-19.jpg', 'uploads/small-user-19.jpg', 1, 1590397184),
(57, 'uploads/user-20.jpg', '', '', 'contact', 17, 'image/jpeg', 18076, 'uploads/thumb-user-20.jpg', 'uploads/small-user-20.jpg', 1, 1590397184),
(58, 'uploads/user-21.jpg', '', '', 'contact', 18, 'image/jpeg', 18186, 'uploads/thumb-user-21.jpg', 'uploads/small-user-21.jpg', 1, 1590397184),
(59, 'uploads/user-22.jpg', '', '', 'contact', 19, 'image/jpeg', 21046, 'uploads/thumb-user-22.jpg', 'uploads/small-user-22.jpg', 1, 1590397184),
(60, 'uploads/user-23.jpg', '', '', 'contact', 20, 'image/jpeg', 15927, 'uploads/thumb-user-23.jpg', 'uploads/small-user-23.jpg', 1, 1590397184),
(61, 'uploads/user-24.jpg', '', '', 'contact', 21, 'image/jpeg', 17054, 'uploads/thumb-user-24.jpg', 'uploads/small-user-24.jpg', 1, 1590397184),
(62, 'uploads/user-25.jpg', '', '', 'contact', 22, 'image/jpeg', 14315, 'uploads/thumb-user-25.jpg', 'uploads/small-user-25.jpg', 1, 1590397184),
(63, 'uploads/user-27.jpg', '', '', 'contact', 23, 'image/jpeg', 14988, 'uploads/thumb-user-27.jpg', 'uploads/small-user-27.jpg', 1, 1590397687),
(64, 'uploads/user-28.jpg', '', '', 'contact', 24, 'image/jpeg', 17042, 'uploads/thumb-user-28.jpg', 'uploads/small-user-28.jpg', 1, 1590397687),
(65, 'uploads/user-29.jpg', '', '', 'contact', 25, 'image/jpeg', 15607, 'uploads/thumb-user-29.jpg', 'uploads/small-user-29.jpg', 1, 1590397687),
(66, 'uploads/user-30.jpg', '', '', 'contact', 26, 'image/jpeg', 21744, 'uploads/thumb-user-30.jpg', 'uploads/small-user-30.jpg', 1, 1590397687),
(67, 'uploads/user-31.jpg', '', '', 'contact', 27, 'image/jpeg', 19906, 'uploads/thumb-user-31.jpg', 'uploads/small-user-31.jpg', 1, 1590397687),
(68, 'uploads/user-32.jpg', '', '', 'contact', 28, 'image/jpeg', 20643, 'uploads/thumb-user-32.jpg', 'uploads/small-user-32.jpg', 1, 1590397687),
(69, 'uploads/user-33.jpg', '', '', 'contact', 29, 'image/jpeg', 24994, 'uploads/thumb-user-33.jpg', 'uploads/small-user-33.jpg', 1, 1590397687),
(70, 'uploads/blog-101.jpg', '', '', 'blogs', 1, 'image/jpeg', 135808, 'uploads/thumb-blog-101.jpg', 'uploads/small-blog-101.jpg', 1, 1590416835),
(71, 'uploads/blog-102.jpg', '', '', 'blogs', 29, 'image/jpeg', 156203, 'uploads/thumb-blog-102.jpg', 'uploads/small-blog-102.jpg', 1, 1590420027),
(72, 'uploads/blog-105.jpg', '', '', 'blogs', 30, 'image/jpeg', 168050, 'uploads/thumb-blog-105.jpg', 'uploads/small-blog-105.jpg', 1, 1590420049),
(73, 'uploads/blog-104.jpg', '', '', 'blogs', 31, 'image/jpeg', 108563, 'uploads/thumb-blog-104.jpg', 'uploads/small-blog-104.jpg', 1, 1590420071),
(74, 'uploads/blog-107.jpg', '', '', 'blogs', 32, 'image/jpeg', 144565, 'uploads/thumb-blog-107.jpg', 'uploads/small-blog-107.jpg', 1, 1590420089),
(75, 'uploads/blog-108.jpg', '', '', 'blogs', 33, 'image/jpeg', 110571, 'uploads/thumb-blog-108.jpg', 'uploads/small-blog-108.jpg', 1, 1590420110),
(76, 'uploads/blog-109.jpg', '', '', 'blogs', 34, 'image/jpeg', 124620, 'uploads/thumb-blog-109.jpg', 'uploads/small-blog-109.jpg', 1, 1590420131),
(77, 'uploads/blog-112.jpg', '', '', 'blogs', 35, 'image/jpeg', 129502, 'uploads/thumb-blog-112.jpg', 'uploads/small-blog-112.jpg', 1, 1590420146),
(78, 'uploads/blog-115.jpg', '', '', 'blogs', 36, 'image/jpeg', 91418, 'uploads/thumb-blog-115.jpg', 'uploads/small-blog-115.jpg', 1, 1590420170),
(79, 'uploads/blog-118.jpg', '', '', 'blogs', 37, 'image/jpeg', 129802, 'uploads/thumb-blog-118.jpg', 'uploads/small-blog-118.jpg', 1, 1590420190),
(80, 'uploads/blog-masonry-113.jpg', '', '', 'blogs', 47, 'image/jpeg', 75307, 'uploads/thumb-blog-masonry-113.jpg', 'uploads/small-blog-masonry-113.jpg', 1, 1590420446),
(81, 'uploads/blog-masonry-118.jpg', '', '', 'blogs', 46, 'image/jpeg', 210372, 'uploads/thumb-blog-masonry-118.jpg', 'uploads/small-blog-masonry-118.jpg', 1, 1590420449),
(82, 'uploads/blog-masonry-116.jpg', '', '', 'blogs', 45, 'image/jpeg', 79827, 'uploads/thumb-blog-masonry-116.jpg', 'uploads/small-blog-masonry-116.jpg', 1, 1590420450),
(83, 'uploads/blog-masonry-115.jpg', '', '', 'blogs', 44, 'image/jpeg', 166502, 'uploads/thumb-blog-masonry-115.jpg', 'uploads/small-blog-masonry-115.jpg', 1, 1590420451),
(84, 'uploads/blog-masonry-114.jpg', '', '', 'blogs', 43, 'image/jpeg', 140105, 'uploads/thumb-blog-masonry-114.jpg', 'uploads/small-blog-masonry-114.jpg', 1, 1590420452),
(85, 'uploads/blog-masonry-112.jpg', '', '', 'blogs', 42, 'image/jpeg', 169206, 'uploads/thumb-blog-masonry-112.jpg', 'uploads/small-blog-masonry-112.jpg', 1, 1590420453),
(86, 'uploads/blog-masonry-107.jpg', '', '', 'blogs', 41, 'image/jpeg', 142545, 'uploads/thumb-blog-masonry-107.jpg', 'uploads/small-blog-masonry-107.jpg', 1, 1590420454),
(87, 'uploads/blog-masonry-105.jpg', '', '', 'blogs', 40, 'image/jpeg', 243363, 'uploads/thumb-blog-masonry-105.jpg', 'uploads/small-blog-masonry-105.jpg', 1, 1590420455),
(88, 'uploads/blog-masonry-104.jpg', '', '', 'blogs', 39, 'image/jpeg', 85819, 'uploads/thumb-blog-masonry-104.jpg', 'uploads/small-blog-masonry-104.jpg', 1, 1590420456),
(89, 'uploads/blog-masonry-103.jpg', '', '', 'blogs', 38, 'image/jpeg', 105714, 'uploads/thumb-blog-masonry-103.jpg', 'uploads/small-blog-masonry-103.jpg', 1, 1590420458),
(90, 'uploads/portfolio-1.jpg', 'Charming looking and young designs', 'Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. ...', 'portfolio', 0, 'image/jpeg', 307227, 'uploads/thumb-portfolio-1.jpg', 'uploads/small-portfolio-1.jpg', 1, 1590423239),
(91, 'uploads/portfolio-2.jpg', 'Stylish looking and modern looks', 'Things aren\'t going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon. sh...', 'portfolio', 0, 'image/jpeg', 218890, 'uploads/thumb-portfolio-2.jpg', 'uploads/small-portfolio-2.jpg', 1, 1590423239),
(92, 'uploads/portfolio-3.jpg', 'Making the best of your style', 'The computer wouldn\'t start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged ...', 'portfolio', 0, 'image/jpeg', 377371, 'uploads/thumb-portfolio-3.jpg', 'uploads/small-portfolio-3.jpg', 1, 1590423239),
(93, 'uploads/portfolio-4.jpg', 'Making the best of your fashion', 'You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you\'re done. That ...', 'portfolio', 0, 'image/jpeg', 227800, 'uploads/thumb-portfolio-4.jpg', 'uploads/small-portfolio-4.jpg', 1, 1590423239),
(94, 'uploads/portfolio-5.jpg', 'Fancy looking with this new style', 'He wondered if he should disclose the truth to his friends. It would be a risky move. Yes, the truth would make things a lot easier if they all stayed...', 'portfolio', 0, 'image/jpeg', 197368, 'uploads/thumb-portfolio-5.jpg', 'uploads/small-portfolio-5.jpg', 1, 1590423239),
(95, 'uploads/portfolio-6.jpg', 'Look gorgeous with modern fashion', 'There was no time. He ran out of the door without half the stuff he needed for work, but it didn\'t matter. He was late and if he didn\'t make this meet...', 'portfolio', 0, 'image/jpeg', 191536, 'uploads/thumb-portfolio-6.jpg', 'uploads/small-portfolio-6.jpg', 1, 1590423239),
(96, 'uploads/portfolio-7.jpg', 'Style that actually works like charm', 'Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which on...', 'portfolio', 0, 'image/jpeg', 235673, 'uploads/thumb-portfolio-7.jpg', 'uploads/small-portfolio-7.jpg', 1, 1590423239),
(97, 'uploads/portfolio-8.jpg', 'Looking stylish all the times', 'Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, emphasizing the depth of her eyes. She was rather handsome than...', 'portfolio', 0, 'image/jpeg', 222000, 'uploads/thumb-portfolio-8.jpg', 'uploads/small-portfolio-8.jpg', 1, 1590423239),
(98, 'uploads/portfolio-9.jpg', 'Latest fashion developments near you', 'He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? Not enough, the said under his breat...', 'portfolio', 0, 'image/jpeg', 183484, 'uploads/thumb-portfolio-9.jpg', 'uploads/small-portfolio-9.jpg', 1, 1590423239),
(99, 'uploads/portfolio-square-1.jpg', 'Creating wonderful looking style', 'It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the ...', 'portfolio', 0, 'image/jpeg', 211379, 'uploads/thumb-portfolio-square-1.jpg', 'uploads/small-portfolio-square-1.jpg', 1, 1590422676),
(100, 'uploads/portfolio-square-2.jpg', 'Making the best of latest fashion', 'The red ball sat proudly at the top of the toybox. It had been the last to be played with and anticipated it would be the next as well. The other toys...', 'portfolio', 0, 'image/jpeg', 151922, 'uploads/thumb-portfolio-square-2.jpg', 'uploads/small-portfolio-square-2.jpg', 1, 1590422676),
(101, 'uploads/portfolio-square-3.jpg', 'Create unreal combinations at your work', 'Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain...', 'portfolio', 0, 'image/jpeg', 231831, 'uploads/thumb-portfolio-square-3.jpg', 'uploads/small-portfolio-square-3.jpg', 1, 1590422676),
(102, 'uploads/portfolio-square-4.jpg', 'Elegant and stylish looking trends', 'Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfie...', 'portfolio', 0, 'image/jpeg', 158188, 'uploads/thumb-portfolio-square-4.jpg', 'uploads/small-portfolio-square-4.jpg', 1, 1590422676),
(103, 'uploads/portfolio-square-5.jpg', 'Creating wonderful cloth combinations', 'It was difficult to explain to them how the diagnosis of certain death had actually given him life. While everyone around him was in tears and upset, ...', 'portfolio', 0, 'image/jpeg', 147047, 'uploads/thumb-portfolio-square-5.jpg', 'uploads/small-portfolio-square-5.jpg', 1, 1590422676),
(104, 'uploads/portfolio-square-6.jpg', 'You make your own looks stylish', 'This is important to remember. Love isn\'t like pie. You don\'t need to divide it among all your friends and loved ones. No matter how much love you giv...', 'portfolio', 0, 'image/jpeg', 125500, 'uploads/thumb-portfolio-square-6.jpg', 'uploads/small-portfolio-square-6.jpg', 1, 1590422676),
(105, 'uploads/portfolio-square-7.jpg', 'Amazing clothes and props of today', 'I\'m heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for the festival there. I will be making October plans once t...', 'portfolio', 0, 'image/jpeg', 153605, 'uploads/thumb-portfolio-square-7.jpg', 'uploads/small-portfolio-square-7.jpg', 1, 1590422676),
(106, 'uploads/portfolio-square-8.jpg', 'Making Up for the best of your looks', 'I haven\'t bailed on writing. Look, I\'m generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an...', 'portfolio', 0, 'image/jpeg', 169137, 'uploads/thumb-portfolio-square-8.jpg', 'uploads/small-portfolio-square-8.jpg', 1, 1590422676),
(107, 'uploads/portfolio-square-9.jpg', 'Your daily style and trendy needs', 'What have you noticed today? I noticed that if you outline the eyes, nose, and mouth on your face with your finger, you make an I which makes perfect ...', 'portfolio', 0, 'image/jpeg', 141883, 'uploads/thumb-portfolio-square-9.jpg', 'uploads/small-portfolio-square-9.jpg', 1, 1590422676),
(108, 'uploads/masonry-71.jpg', 'Super fabulous feel at work now', 'It went through such rapid contortions that the little bear was forced to change his hold on it so many times he became confused in the darkness, and ...', 'portfolio', 0, 'image/jpeg', 145784, 'uploads/thumb-masonry-71.jpg', 'uploads/small-masonry-71.jpg', 1, 1590422468),
(109, 'uploads/masonry-72.jpg', 'Not just any fashion for you today', 'The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. ,Sir, you will undoubtedly...', 'portfolio', 0, 'image/jpeg', 254051, 'uploads/thumb-masonry-72.jpg', 'uploads/small-masonry-72.jpg', 1, 1590422468),
(110, 'uploads/masonry-73.jpg', 'Make new trends rich every corner', 'If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you\'ll have a rough idea of w...', 'portfolio', 0, 'image/jpeg', 245654, 'uploads/thumb-masonry-73.jpg', 'uploads/small-masonry-73.jpg', 1, 1590422468),
(111, 'uploads/masonry-74.jpg', 'Making your fashion superior today', 'The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it bee...', 'portfolio', 0, 'image/jpeg', 246801, 'uploads/thumb-masonry-74.jpg', 'uploads/small-masonry-74.jpg', 1, 1590422468),
(112, 'uploads/masonry-75.jpg', 'Being fabulous is the current need', 'The trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages l...', 'portfolio', 0, 'image/jpeg', 178253, 'uploads/thumb-masonry-75.jpg', 'uploads/small-masonry-75.jpg', 1, 1590422468),
(113, 'uploads/masonry-76.jpg', 'Fashion industry and its trends', 'He sat across from her trying to imagine it was the first time. It wasn\'t. Had it been a hundred? It quite possibly could have been. Two hundred? Prob...', 'portfolio', 0, 'image/jpeg', 179271, 'uploads/thumb-masonry-76.jpg', 'uploads/small-masonry-76.jpg', 1, 1590422468),
(114, 'uploads/masonry-77.jpg', 'Models posing to the latest trends', 'What were they eating? It didn\'t taste like anything she had ever eaten before and although she was famished, she didn\'t dare ask. She knew the answer...', 'portfolio', 0, 'image/jpeg', 157745, 'uploads/thumb-masonry-77.jpg', 'uploads/small-masonry-77.jpg', 1, 1590422468),
(115, 'uploads/masonry-78.jpg', 'Beautiful art and its creations', 'Then came the night of the first falling star. It was seen early in the morning, rushing over Winchester eastward, a line of flame high in the atmosph...', 'portfolio', 0, 'image/jpeg', 136803, 'uploads/thumb-masonry-78.jpg', 'uploads/small-masonry-78.jpg', 1, 1590422468),
(116, 'uploads/masonry-79.jpg', 'Making Up for the best of your looks', 'The red ball sat proudly at the top of the toybox. It had been the last to be played with and anticipated it would be the next as well. The other toys...', 'portfolio', 0, 'image/jpeg', 181545, 'uploads/thumb-masonry-79.jpg', 'uploads/small-masonry-79.jpg', 1, 1590422468),
(117, 'uploads/masonry-80.jpg', 'Creating wonderful cloth combinations', 'Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, emphasizing the depth of her eyes. She was rather handsome than...', 'portfolio', 0, 'image/jpeg', 197960, 'uploads/thumb-masonry-80.jpg', 'uploads/small-masonry-80.jpg', 1, 1590422468),
(118, 'uploads/masonry-81.jpg', 'Create unreal combinations at your work', 'If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you\'ll have a rough idea of w...', 'portfolio', 0, 'image/jpeg', 208775, 'uploads/thumb-masonry-81.jpg', 'uploads/small-masonry-81.jpg', 1, 1590422468),
(119, 'uploads/masonry-82.jpg', 'Making the best of your style', 'The boy walked down the street in a carefree way, playing without notice of what was about him. He didn\'t hear the sound of the car as his ball careen...', 'portfolio', 0, 'image/jpeg', 250914, 'uploads/thumb-masonry-82.jpg', 'uploads/small-masonry-82.jpg', 1, 1590422468),
(120, 'uploads/masonry-83.jpg', 'Gorgeous and appealing fashion', 'The robot clicked disapprovingly, gurgled briefly inside its cubical interior and extruded a pony glass of brownish liquid. ,Sir, you will undoubtedly...', 'portfolio', 0, 'image/jpeg', 150821, 'uploads/thumb-masonry-83.jpg', 'uploads/small-masonry-83.jpg', 1, 1590422468),
(121, 'uploads/masonry-84.jpg', 'Models posing to the latest trends', 'Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was l...', 'portfolio', 0, 'image/jpeg', 227855, 'uploads/thumb-masonry-84.jpg', 'uploads/small-masonry-84.jpg', 1, 1590422468),
(122, 'uploads/masonry-85.jpg', 'Make new trends rich every corner', 'Do you think you\'re living an ordinary life? You are so mistaken it\'s difficult to even explain. The mere fact that you exist makes you extraordinary....', 'portfolio', 0, 'image/jpeg', 249798, 'uploads/thumb-masonry-85.jpg', 'uploads/small-masonry-85.jpg', 1, 1590422468),
(123, 'uploads/carousel-11.jpg', '', '', 'albums', 3, 'image/jpeg', 283450, 'uploads/thumb-carousel-11.jpg', 'uploads/small-carousel-11.jpg', 1, 1590475546),
(124, 'uploads/carousel-12.jpg', '', '', 'albums', 3, 'image/jpeg', 238857, 'uploads/thumb-carousel-12.jpg', 'uploads/small-carousel-12.jpg', 1, 1590475546),
(125, 'uploads/carousel-13.jpg', '', '', 'albums', 3, 'image/jpeg', 251936, 'uploads/thumb-carousel-13.jpg', 'uploads/small-carousel-13.jpg', 1, 1590475546),
(126, 'uploads/carousel-14.jpg', '', '', 'albums', 3, 'image/jpeg', 335038, 'uploads/thumb-carousel-14.jpg', 'uploads/small-carousel-14.jpg', 1, 1590475546),
(127, 'uploads/carousel-32.jpg', '', '', 'albums', 3, 'image/jpeg', 292354, 'uploads/thumb-carousel-32.jpg', 'uploads/small-carousel-32.jpg', 1, 1590475555),
(128, 'uploads/carousel-33.jpg', '', '', 'albums', 3, 'image/jpeg', 205479, 'uploads/thumb-carousel-33.jpg', 'uploads/small-carousel-33.jpg', 1, 1590475555),
(129, 'uploads/carousel-34.jpg', '', '', 'albums', 3, 'image/jpeg', 237353, 'uploads/thumb-carousel-34.jpg', 'uploads/small-carousel-34.jpg', 1, 1590475555),
(130, 'uploads/access-2.jpg', '', '', 'albums', 4, 'image/jpeg', 405720, 'uploads/thumb-access-2.jpg', 'uploads/small-access-2.jpg', 1, 1590475559),
(131, 'uploads/access-7.jpg', '', '', 'albums', 4, 'image/jpeg', 734049, 'uploads/thumb-access-7.jpg', 'uploads/small-access-7.jpg', 1, 1590475559),
(132, 'uploads/access-8.jpg', '', '', 'albums', 4, 'image/jpeg', 352199, 'uploads/thumb-access-8.jpg', 'uploads/small-access-8.jpg', 1, 1590475559),
(133, 'uploads/carousel-21.jpg', '', '', 'albums', 5, 'image/jpeg', 133052, 'uploads/thumb-carousel-21.jpg', 'uploads/small-carousel-21.jpg', 1, 1590475562),
(134, 'uploads/carousel-22.jpg', '', '', 'albums', 5, 'image/jpeg', 435794, 'uploads/thumb-carousel-22.jpg', 'uploads/small-carousel-22.jpg', 1, 1590475562),
(135, 'uploads/carousel-23.jpg', '', '', 'albums', 5, 'image/jpeg', 177287, 'uploads/thumb-carousel-23.jpg', 'uploads/small-carousel-23.jpg', 1, 1590475562),
(136, 'uploads/carousel-24.jpg', '', '', 'albums', 5, 'image/jpeg', 173137, 'uploads/thumb-carousel-24.jpg', 'uploads/small-carousel-24.jpg', 1, 1590475562),
(137, 'uploads/modal.jpg', '', '', 'albums', 6, 'image/jpeg', 230175, 'uploads/thumb-modal.jpg', 'uploads/small-modal.jpg', 1, 1590475565),
(138, 'uploads/parallax-1.jpg', '', '', 'albums', 6, 'image/jpeg', 232975, 'uploads/thumb-parallax-1.jpg', 'uploads/small-parallax-1.jpg', 1, 1590475565),
(139, 'uploads/parallax-2.jpg', '', '', 'albums', 6, 'image/jpeg', 176815, 'uploads/thumb-parallax-2.jpg', 'uploads/small-parallax-2.jpg', 1, 1590475565),
(140, 'uploads/parallax-3.jpg', '', '', 'albums', 6, 'image/jpeg', 246768, 'uploads/thumb-parallax-3.jpg', 'uploads/small-parallax-3.jpg', 1, 1590475565),
(141, 'uploads/blog-107.jpg', '', '', 'albums', 7, 'image/jpeg', 144565, 'uploads/thumb-blog-107.jpg', 'uploads/small-blog-107.jpg', 1, 1590474843),
(142, 'uploads/blog-108.jpg', '', '', 'albums', 7, 'image/jpeg', 110571, 'uploads/thumb-blog-108.jpg', 'uploads/small-blog-108.jpg', 1, 1590474843),
(143, 'uploads/blog-109.jpg', '', '', 'albums', 7, 'image/jpeg', 124620, 'uploads/thumb-blog-109.jpg', 'uploads/small-blog-109.jpg', 1, 1590474843),
(144, 'uploads/blog-110.jpg', '', '', 'albums', 7, 'image/jpeg', 105467, 'uploads/thumb-blog-110.jpg', 'uploads/small-blog-110.jpg', 1, 1590474843),
(145, 'uploads/blog-103.jpg', '', '', 'albums', 7, 'image/jpeg', 70564, 'uploads/thumb-blog-103.jpg', 'uploads/small-blog-103.jpg', 1, 1590475571),
(146, 'uploads/blog-104.jpg', '', '', 'albums', 7, 'image/jpeg', 108563, 'uploads/thumb-blog-104.jpg', 'uploads/small-blog-104.jpg', 1, 1590475571),
(147, 'uploads/blog-105.jpg', '', '', 'albums', 7, 'image/jpeg', 168050, 'uploads/thumb-blog-105.jpg', 'uploads/small-blog-105.jpg', 1, 1590475571),
(148, 'uploads/blog-106.jpg', '', '', 'albums', 7, 'image/jpeg', 117082, 'uploads/thumb-blog-106.jpg', 'uploads/small-blog-106.jpg', 1, 1590475571),
(149, 'uploads/blog-107.jpg', '', '', 'albums', 7, 'image/jpeg', 144565, 'uploads/thumb-blog-107.jpg', 'uploads/small-blog-107.jpg', 1, 1590475571),
(150, 'uploads/blog-108.jpg', '', '', 'albums', 7, 'image/jpeg', 110571, 'uploads/thumb-blog-108.jpg', 'uploads/small-blog-108.jpg', 1, 1590475571),
(151, 'uploads/blog-109.jpg', '', '', 'albums', 7, 'image/jpeg', 124620, 'uploads/thumb-blog-109.jpg', 'uploads/small-blog-109.jpg', 1, 1590475571),
(152, 'uploads/blog-110.jpg', '', '', 'albums', 7, 'image/jpeg', 105467, 'uploads/thumb-blog-110.jpg', 'uploads/small-blog-110.jpg', 1, 1590475571),
(153, 'uploads/full-slider-1.jpg', '', '', 'albums', 8, 'image/jpeg', 829799, 'uploads/thumb-full-slider-1.jpg', 'uploads/small-full-slider-1.jpg', 1, 1590475575),
(154, 'uploads/full-slider-2.jpg', '', '', 'albums', 8, 'image/jpeg', 684273, 'uploads/thumb-full-slider-2.jpg', 'uploads/small-full-slider-2.jpg', 1, 1590475575),
(155, 'uploads/full-slider-3.jpg', '', '', 'albums', 8, 'image/jpeg', 982484, 'uploads/thumb-full-slider-3.jpg', 'uploads/small-full-slider-3.jpg', 1, 1590475575),
(156, 'uploads/full-slider-4.jpg', '', '', 'albums', 8, 'image/jpeg', 226345, 'uploads/thumb-full-slider-4.jpg', 'uploads/small-full-slider-4.jpg', 1, 1590475575),
(157, 'uploads/carousel-2.jpg', '', '', 'albums', 9, 'image/jpeg', 352355, 'uploads/thumb-carousel-2.jpg', 'uploads/small-carousel-2.jpg', 1, 1590475579),
(158, 'uploads/carousel-3.jpg', '', '', 'albums', 9, 'image/jpeg', 264772, 'uploads/thumb-carousel-3.jpg', 'uploads/small-carousel-3.jpg', 1, 1590475579),
(159, 'uploads/carousel-4.jpg', '', '', 'albums', 9, 'image/jpeg', 150521, 'uploads/thumb-carousel-4.jpg', 'uploads/small-carousel-4.jpg', 1, 1590475579),
(160, 'uploads/carousel-5.jpg', '', '', 'albums', 9, 'image/jpeg', 245974, 'uploads/thumb-carousel-5.jpg', 'uploads/small-carousel-5.jpg', 1, 1590475579),
(161, 'uploads/blog-110.jpg', '', '', 'albums', 10, 'image/jpeg', 105467, 'uploads/thumb-blog-110.jpg', 'uploads/small-blog-110.jpg', 1, 1590475582),
(162, 'uploads/blog-112.jpg', '', '', 'albums', 10, 'image/jpeg', 129502, 'uploads/thumb-blog-112.jpg', 'uploads/small-blog-112.jpg', 1, 1590475582),
(163, 'uploads/blog-113.jpg', '', '', 'albums', 10, 'image/jpeg', 76540, 'uploads/thumb-blog-113.jpg', 'uploads/small-blog-113.jpg', 1, 1590475582),
(164, 'uploads/blog-114.jpg', '', '', 'albums', 10, 'image/jpeg', 112467, 'uploads/thumb-blog-114.jpg', 'uploads/small-blog-114.jpg', 1, 1590475582),
(165, 'uploads/blog-115.jpg', '', '', 'albums', 10, 'image/jpeg', 91418, 'uploads/thumb-blog-115.jpg', 'uploads/small-blog-115.jpg', 1, 1590475582),
(166, 'uploads/blog-116.jpg', '', '', 'albums', 10, 'image/jpeg', 85229, 'uploads/thumb-blog-116.jpg', 'uploads/small-blog-116.jpg', 1, 1590475582),
(167, 'uploads/blog-masonry-109.jpg', '', '', 'albums', 11, 'image/jpeg', 103957, 'uploads/thumb-blog-masonry-109.jpg', 'uploads/small-blog-masonry-109.jpg', 1, 1590475586),
(168, 'uploads/blog-masonry-111.jpg', '', '', 'albums', 11, 'image/jpeg', 228275, 'uploads/thumb-blog-masonry-111.jpg', 'uploads/small-blog-masonry-111.jpg', 1, 1590475586),
(169, 'uploads/blog-masonry-112.jpg', '', '', 'albums', 11, 'image/jpeg', 169206, 'uploads/thumb-blog-masonry-112.jpg', 'uploads/small-blog-masonry-112.jpg', 1, 1590475586),
(170, 'uploads/blog-masonry-113.jpg', '', '', 'albums', 11, 'image/jpeg', 75307, 'uploads/thumb-blog-masonry-113.jpg', 'uploads/small-blog-masonry-113.jpg', 1, 1590475586),
(171, 'uploads/blog-masonry-114.jpg', '', '', 'albums', 11, 'image/jpeg', 140105, 'uploads/thumb-blog-masonry-114.jpg', 'uploads/small-blog-masonry-114.jpg', 1, 1590475586),
(172, 'uploads/access-6.jpg', '', '', 'albums', 12, 'image/jpeg', 425585, 'uploads/thumb-access-6.jpg', 'uploads/small-access-6.jpg', 1, 1590475590),
(173, 'uploads/access-7.jpg', '', '', 'albums', 12, 'image/jpeg', 734049, 'uploads/thumb-access-7.jpg', 'uploads/small-access-7.jpg', 1, 1590475590),
(174, 'uploads/access-10.jpg', '', '', 'albums', 12, 'image/jpeg', 499638, 'uploads/thumb-access-10.jpg', 'uploads/small-access-10.jpg', 1, 1590475590),
(175, 'uploads/access-12.jpg', '', '', 'albums', 12, 'image/jpeg', 644840, 'uploads/thumb-access-12.jpg', 'uploads/small-access-12.jpg', 1, 1590475590),
(176, 'uploads/slider-7.jpg', '', '', 'albums', 16, 'image/jpeg', 171460, 'uploads/thumb-slider-7.jpg', 'uploads/small-slider-7.jpg', 1, 1590475605),
(177, 'uploads/slider-8.jpg', '', '', 'albums', 16, 'image/jpeg', 198604, 'uploads/thumb-slider-8.jpg', 'uploads/small-slider-8.jpg', 1, 1590475605),
(178, 'uploads/slider-10.jpg', '', '', 'albums', 16, 'image/jpeg', 430240, 'uploads/thumb-slider-10.jpg', 'uploads/small-slider-10.jpg', 1, 1590475605),
(179, 'uploads/slider-11.jpg', '', '', 'albums', 16, 'image/jpeg', 391949, 'uploads/thumb-slider-11.jpg', 'uploads/small-slider-11.jpg', 1, 1590475605),
(180, 'uploads/slider-12.jpg', '', '', 'albums', 16, 'image/jpeg', 128638, 'uploads/thumb-slider-12.jpg', 'uploads/small-slider-12.jpg', 1, 1590475605),
(181, 'uploads/team-3.jpg', '', '', 'albums', 15, 'image/jpeg', 83710, 'uploads/thumb-team-3.jpg', 'uploads/small-team-3.jpg', 1, 1590475600),
(182, 'uploads/team-6.jpg', '', '', 'albums', 15, 'image/jpeg', 111524, 'uploads/thumb-team-6.jpg', 'uploads/small-team-6.jpg', 1, 1590475600),
(183, 'uploads/team-7.jpg', '', '', 'albums', 15, 'image/jpeg', 155737, 'uploads/thumb-team-7.jpg', 'uploads/small-team-7.jpg', 1, 1590475600),
(184, 'uploads/team-8.jpg', '', '', 'albums', 15, 'image/jpeg', 96475, 'uploads/thumb-team-8.jpg', 'uploads/small-team-8.jpg', 1, 1590475600),
(185, 'uploads/masonry-71.jpg', '', '', 'albums', 14, 'image/jpeg', 145784, 'uploads/thumb-masonry-71.jpg', 'uploads/small-masonry-71.jpg', 1, 1590475597),
(186, 'uploads/masonry-74.jpg', '', '', 'albums', 14, 'image/jpeg', 246801, 'uploads/thumb-masonry-74.jpg', 'uploads/small-masonry-74.jpg', 1, 1590475597),
(187, 'uploads/masonry-76.jpg', '', '', 'albums', 14, 'image/jpeg', 179271, 'uploads/thumb-masonry-76.jpg', 'uploads/small-masonry-76.jpg', 1, 1590475597),
(188, 'uploads/masonry-77.jpg', '', '', 'albums', 14, 'image/jpeg', 157745, 'uploads/thumb-masonry-77.jpg', 'uploads/small-masonry-77.jpg', 1, 1590475597),
(189, 'uploads/masonry-78.jpg', '', '', 'albums', 14, 'image/jpeg', 136803, 'uploads/thumb-masonry-78.jpg', 'uploads/small-masonry-78.jpg', 1, 1590475597),
(190, 'uploads/masonry-79.jpg', '', '', 'albums', 14, 'image/jpeg', 181545, 'uploads/thumb-masonry-79.jpg', 'uploads/small-masonry-79.jpg', 1, 1590475597),
(191, 'uploads/masonry-80.jpg', '', '', 'albums', 14, 'image/jpeg', 197960, 'uploads/thumb-masonry-80.jpg', 'uploads/small-masonry-80.jpg', 1, 1590475597),
(192, 'uploads/slider-5.jpg', '', '', 'albums', 13, 'image/jpeg', 675210, 'uploads/thumb-slider-5.jpg', 'uploads/small-slider-5.jpg', 1, 1590475593),
(193, 'uploads/slider-6.jpg', '', '', 'albums', 13, 'image/jpeg', 116669, 'uploads/thumb-slider-6.jpg', 'uploads/small-slider-6.jpg', 1, 1590475593),
(194, 'uploads/slider-7.jpg', '', '', 'albums', 13, 'image/jpeg', 171460, 'uploads/thumb-slider-7.jpg', 'uploads/small-slider-7.jpg', 1, 1590475593),
(195, 'uploads/slider-8.jpg', '', '', 'albums', 13, 'image/jpeg', 198604, 'uploads/thumb-slider-8.jpg', 'uploads/small-slider-8.jpg', 1, 1590475593),
(196, 'uploads/slider-9.jpg', '', '', 'albums', 13, 'image/jpeg', 603820, 'uploads/thumb-slider-9.jpg', 'uploads/small-slider-9.jpg', 1, 1590475593),
(197, 'uploads/slider-10.jpg', '', '', 'albums', 13, 'image/jpeg', 430240, 'uploads/thumb-slider-10.jpg', 'uploads/small-slider-10.jpg', 1, 1590475593),
(198, 'uploads/blog-113.jpg', '', '', 'albums', 17, 'image/jpeg', 76540, 'uploads/thumb-blog-113.jpg', 'uploads/small-blog-113.jpg', 1, 1590475609),
(199, 'uploads/blog-114.jpg', '', '', 'albums', 17, 'image/jpeg', 112467, 'uploads/thumb-blog-114.jpg', 'uploads/small-blog-114.jpg', 1, 1590475609),
(200, 'uploads/blog-115.jpg', '', '', 'albums', 17, 'image/jpeg', 91418, 'uploads/thumb-blog-115.jpg', 'uploads/small-blog-115.jpg', 1, 1590475609),
(201, 'uploads/blog-116.jpg', '', '', 'albums', 17, 'image/jpeg', 85229, 'uploads/thumb-blog-116.jpg', 'uploads/small-blog-116.jpg', 1, 1590475609),
(202, 'uploads/blog-117.jpg', '', '', 'albums', 17, 'image/jpeg', 130249, 'uploads/thumb-blog-117.jpg', 'uploads/small-blog-117.jpg', 1, 1590475609),
(203, 'uploads/blog-118.jpg', '', '', 'albums', 17, 'image/jpeg', 129802, 'uploads/thumb-blog-118.jpg', 'uploads/small-blog-118.jpg', 1, 1590475609),
(204, 'uploads/blog-108.jpg', '', '', 'event', 1, 'image/jpeg', 110571, 'uploads/thumb-blog-108.jpg', 'uploads/small-blog-108.jpg', 1, 1590475860),
(205, 'uploads/blog-109.jpg', '', '', 'event', 1, 'image/jpeg', 124620, 'uploads/thumb-blog-109.jpg', 'uploads/small-blog-109.jpg', 1, 1590475860),
(206, 'uploads/blog-110.jpg', '', '', 'event', 1, 'image/jpeg', 105467, 'uploads/thumb-blog-110.jpg', 'uploads/small-blog-110.jpg', 1, 1590475860),
(207, 'uploads/carousel-13.jpg', '', '', 'event', 3, 'image/jpeg', 251936, 'uploads/thumb-carousel-13.jpg', 'uploads/small-carousel-13.jpg', 1, 1590476187),
(208, 'uploads/carousel-14.jpg', '', '', 'event', 3, 'image/jpeg', 335038, 'uploads/thumb-carousel-14.jpg', 'uploads/small-carousel-14.jpg', 1, 1590476187),
(209, 'uploads/cards-1.jpg', '', '', 'chat', 4, 'image/jpeg', 104266, 'uploads/thumb-cards-1.jpg', 'uploads/small-cards-1.jpg', 1, 1590476660),
(210, 'uploads/blog-108.jpg', '', '', 'mail', 3, 'image/jpeg', 110571, 'uploads/thumb-blog-108.jpg', 'uploads/small-blog-108.jpg', 1, 1590476873),
(211, 'uploads/blog-109.jpg', '', '', 'mail', 3, 'image/jpeg', 124620, 'uploads/thumb-blog-109.jpg', 'uploads/small-blog-109.jpg', 1, 1590476873);

-- --------------------------------------------------------

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `phone`, `position`, `location`, `dob`, `gender`, `brief`, `image`, `usertype`, `account_type`, `labels`, `active`, `code`, `verified`, `verification_code`, `auth_user`, `updated`) VALUES
(2, 'demo', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Demo User', 'email2@example.com', '9994448486', 'GM, Tech Inc.', 'Berlin', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '32', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590395108),
(3, 'clint', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Clint Karl', 'email3@example.com', '9994448488', 'CEO, Tech Inc.', 'USA', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '33', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(4, 'chris', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Chris Denwer', 'email4@example.com', '9994448487', 'CTO, Tech Inc.', 'India', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '34', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(5, 'doug', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Doug Larson', 'email5@example.com', '9994448489', 'Marketing, Tech Inc.', 'USA', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '35', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(6, 'jean', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Webb Jean', 'email6@example.com', '9994448490', 'Editor, Tech Inc.', 'India', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '36', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(7, 'janep', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Jane Parson', 'email7@example.com', '9994448491', 'Writter, Tech Inc.', 'France', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '37', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(8, 'peter', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Peter Butler', 'email8@example.com', '9994448421', 'QnA, Tech Inc.', 'Spain', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '38', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(9, 'barry', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Barry Hems', 'email9@example.com', '9994448462', 'SaaS, Tech Inc.', 'Italy', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '39', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(10, 'twinkle', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Twinkle Larson', 'email10@example.com', '9994448412', 'Team Lead, Tech Inc.', 'India', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '40', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(11, 'austin', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Austin  Cook', 'email11@example.com', '9994448932', 'Sr. Manager, Tech Inc.', 'India', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '26', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(12, 'henry', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Henry Webb', 'email12@example.com', '9994448352', 'Sales Executive, Tech Inc.', 'India', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '27', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(13, 'glenn', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Glenn York', 'email13@example.com', '9994148768', 'Sales, Tech Inc.', 'Germany', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '28', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(14, 'warne', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Jimmy Warne', 'email14@example.com', '9994448457', 'Designer, Tech Inc.', 'USA', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '29', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669),
(15, 'brett', 'fe01ce2a7fbac8fafaed7c982a04e229', 'Brett Doug', 'email15@example.com', '9994464853', 'Developer, Tech Inc.', 'UK', '609811200', 'male', 'Hello, A Professional web developer. I love photography and being creative. Get in touch with me today for any professional photography.', '30', 'user', 'demo', '', 1, 100916, 1, 0, 1, 1590393669);


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `event_categories`
--
ALTER TABLE `event_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `follower`
--
ALTER TABLE `follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `mails`
--
ALTER TABLE `mails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `mail_categories`
--
ALTER TABLE `mail_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;


COMMIT;

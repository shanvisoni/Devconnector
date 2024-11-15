// const express = require('express');
// const router = express.Router();
// const request=require('request');
// const config=require('config');
// const Profile = require('../../models/Profile');
// const User = require('../../models/User');
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');

// router.get('/me', auth, async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user: req.user.id }).populate(
//             'user',
//             ['name', 'avatar']
//         );

//         if (!profile) {
//             return res.status(400).json({ msg: 'There is no profile for this user' })
//         }
//         res.json(profile)
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error')
//     }
// })

// router.post('/',

//     [auth, [
//         check('status', 'Status is required').notEmpty(),
//         check('skills', 'skills are required').notEmpty(),

//     ]
//     ], async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() })
//         }
//         const {
//             company,
//             website,
//             location,
//             bio,
//             status,
//             githubusername,
//             skills,
//             youtube,
//             twitter,
//             instagram,
//             linkedin,
//             facebook,

//         } = req.body;

//         const profileFields = {};
//         profileFields.user = req.user.id;
//         if (company) profileFields.company = company;
//         if (website) profileFields.website = website;
//         if (location) profileFields.location = location;
//         if (bio) profileFields.bio = bio;
//         if (status) profileFields.status = status;
//         if (githubusername) profileFields.githubusername = githubusername;
//         if (skills) {
//             profileFields.skills = skills.split(',').map(skill => skill.trim());
//         }

//         profileFields.social = {};
//         profileFields.user = req.user.id;
//         if ('youtube') profileFields.social.youtube = youtube
//         if ('twitter') profileFields.social.twitter = twitter
//         if ('facebook') profileFields.social.facebook = facebook
//         if ('linkedin') profileFields.social.linkedin = linkedin
//         if ('instagram') profileFields.social.instagram = instagram

//         try {
//             let profile = await Profile.findOne({ user: req.user.id });

//             if (profile) {
//                 profile = await Profile.findOneAndUpdate(
//                     { user: req.user.id },
//                     { $set: profileFields },
//                     { new: true }
//                 );
//                 return res.json(profile);
//             }
//             profile = new Profile(profileFields);
//             await profile.save()
//             res.json(profile);
//         }
//         catch (err) {
//             console.error(err.message)
//             res.status(500).send('server error')
//         }
//         //    res.send('Hellow')
//     }
// )

// // @route    GET api/profile
// // @desc     Get all profiles
// // @access   Public
// router.get('/', async(req,res)=>{
//     try{
// const profiles= await Profile.find().populate('user',['name','avatar']);
//     res.json(profiles)
//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }
// });



// // @route    GET api/profile/user/:user_id
// // @desc     Get profile by user id
// // @access   Public
// router.get('/user/:user_id',
//     async (req,res) => {
//       try {
//         const profile = await Profile.findOne({
//           user: req.params.user_id
//         }).populate('user', ['name', 'avatar']);
  
//         if (!profile) return res.status(400).json({ msg: 'Profile not found' });
  
//         return res.json(profile);
//       } catch (err) {
//         console.error(err.message);
//         if(err.kind=='ObjectId'){
//             return res.status(400).json({msg:'Profile not found'});
//         }
//          res.status(500).send({ msg: 'Server error' });
//       }
//     }
//   );

//   router.delete('/', auth,async(req,res)=>{
//     try{
// await Profile.findOneAndDelete({user: req.user.id})
// await User.findOneAndDelete({_id: req.user.id})

// res.json({msg:"User deleted"});
//     }
//     catch (err) {
//         console.error(err.message);
//         if(err.kind=='ObjectId'){
//             return res.status(400).json({msg:'Profile not found'});
//         }
//          res.status(500).send({ msg: 'Server error' });
//       }
//   })



// router.put('/experience',[
//     auth,
//     [
//         check('title','title is required')
//         .not()
//         .isEmpty(),
//         check('company','company is required')
//         .not()
//         .isEmpty(),
//         check('from','form is required')
//         .not()
//         .isEmpty()
//     ]
// ],

// async(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status (400).json({errors:errors.array()});
//     }
//     const {
//         title,
//         company,
//         location,
//         from,
//         to,
//         current,
//         description
//     }=req.body;
//     const newExp={
//         title,
//         company,
//         location,
//         from,
//         to,
//         current,
//         description
//     }
//     try{
//         const profile=await Profile.findOne({user:req.user.id})


//         if (!profile) {
//             return res.status(404).json({ msg: 'Profile not found' });
//         }

//         profile.experience.unshift(newExp);
//         await profile.save();
//         res.json(profile)

//     }
//     catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//       }

// }
// );

// router.delete('/experience/:exp_id',auth,async(req,res)=>{
//     try {
//          const profile=await Profile.findOne({user:req.user.id});

//     const removeIndex=profile.experience.map(item=>item.id)
//     .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex,1);
//     await profile.save();

//     res.json(profile);
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
   

// })


// router.put ('/education',[auth,[
// check('school',"school is required")
// .not()
//         .isEmpty(),
//         check('fieldofstudy','fieldofstudy is required')
//         .not()
//         .isEmpty(),
//         check('degree','degree is required')
//         .not()
//         .isEmpty(),
//         check('from','form is required')
//         .not()
//         .isEmpty()
// ]],async(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
// return res.status(400).json({errors:errors.array()})
//     }

//     const{
//         school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
//     }=req.body;

//     const newEdu={
//     school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
// }

// try{
//     const profile=await Profile.findOne({user:req.user.id})


//     if (!profile) {
//         return res.status(404).json({ msg: 'Profile not found' });
//     }

//     profile.education.unshift(newEdu);
//     await profile.save();
//     res.json(profile)

// }
// catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// })

// router.delete('/education/:edu_id',auth,async(req,res)=>{
//     try {
//          const profile=await Profile.findOne({user:req.user.id});

//     const removeIndex=profile.education.map(item=>item.id)
//     .indexOf(req.params.exp_id);

//     profile.education.splice(removeIndex,1);
//     await profile.save();

//     res.json(profile);
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
   

// })


// // @route    GET api/profile/github:username
// // @desc     Get all repos
// // @access   Public

// router.get('/github/:username',(req,res)=>{
//     try {
//         const options={
//             uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc$client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
//             method:'GET',
//             headers:{'user-agent':'node.js'}
//         } 
//         request(options,(error,response,body)=>{
//             if (error) {
//                 console.error(error);
//                 return res.status(500).json({ msg: "Server error while fetching GitHub data" });
//             }

//           if(response.statusCode !== 200){
//            return res.status(404).json({msg:"No Github profile found"});
//           }

//           res.json(JSON.parse(body));
//     });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
   
// })
// module.exports = router;











const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;

import { FC } from 'react';
import DefaultLayout, { ContentHeader, ContentContainer} from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { CiCircleQuestion } from "react-icons/ci";








const faqItems: Faq[] = [
  {
    title: 'Why eivu?',
    details:
      'Why not.',
  }
  // ,{
  //   title: 'No really, why eivu?',
  //   details:
  //     'In this modern media and tech landscape of ours you no longer blown your own content, you merely pay for access to it.  However if the distribution rights or politics change you can <a href="https://www.avclub.com/disney-scrubbed-trans-rights-episode-of-moon-girl-and-devil-dinosaur">lose access to it</a>. Plus you like I may love Spotify but it sucks to a). Or have access to all of the mp3s you "aquired" over the years and all the playlists you painstakingly curated in iTunes (yes Apple Music users we all know how cool you are). Well eivu is the answer to that',
  // },{
  //   title: 'Why not Plex?',
  //   details:
  //     'Plex is amazing, but it requires an up front cost of money and time into infrastructure.  Plex is also advantageous if you plan to have multiple 10s of terabytes. The Plex of a dear friend is around 90 TB.  If however you mainly want access to your own collection of mp3s, Plex may be overkill',
  // },{
  //   title: 'Do you recommend using AWS S3?',
  //   details:
  //     'Not really. AWS optimizes all of its services to work best and most cost effectively with itself.  AWS bandwidth costs is free if you send the content to other AWS services. When working outside the network, though AWS is cheap for storage, you pay through the nose for bandwidth. When I first sarted using eivu, my costs of bandwidth would be 10x what I was paying for storage. As such I would recommend wasabi.  It costs 6 per TB. And bandwidth is free as long as you "stream" less than you store.  Ie if you have 2tb of content, you pay nothing as long as you don\'t stream all of it',
  // },{
  //   title: 'What do you get out of this?',
  //   details:
  //     'Access to my own content. And knowledge. I plan reimplement eivu, server and client, into any forthcoming language I want to learn. Now that stuff is already working and architected I can just figure out how to do it again in rust or nestjs',
  // },{
  //   title: 'Your sign up functionality Is broken, how can I sign up?',
  //   details:
  //     'Again...... who are you?',
  // },{
  //   title: '',
  //   details:
  //   '',
  // },{
  //   title: '',
  //   details:
  //   },{
  //   title: '',
  //   details:
  //     'It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content ui/ux strategy that we your first blog post.',
  // },
];


export const About: FC = () => {
  return (
    <DefaultLayout>
      <ContentHeader>::About</ContentHeader>
      <ContentContainer>
        <p>what you have before you is a labor of love (now - 2012) years in the making. It's gone through several total rewrites, reenvionings, and rearchitectings but its now a live thing before your very eyes</p>
        <br />
        <p>You're welcome! and i'm talking to me, not you. I actually have no idea who you are, how you got here, or what you're doing on this site</p>


    <div>
      {faqItems.map((item, index) => (
        <div key={index} className="flex gap-6 py-10">
          <div className="flex h-15 w-full max-w-15 items-center justify-center rounded-xl bg-primary text-white">
            <CiCircleQuestion size={33}/>
          </div>

          <div className="flex w-full flex-col gap-6">
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              {item.title}
            </h4>
            <p className="w-full font-medium">{item.details}</p>
          </div>
        </div>
      ))}
    </div>






      </ContentContainer>
    </DefaultLayout>
  );
};

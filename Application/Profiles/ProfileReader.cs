using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext dataContext, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _dataContext = dataContext;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new {User = "Not found"});
            }

            var currentUser = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Photos = user.Photos,
                Bio = user.Bio,
                FollowersCount = user.Followers.Count(),
                FollowingCount = user.Followings.Count()
            };

            if (currentUser.Followings.Any(x => x.TargetId == user.Id))
            {
                profile.IsFollowed = true;
            }

            return profile;
        }
    }
}
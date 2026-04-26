import { Either, left } from '@app/ddd/either';
import { Mapper } from '@app/ddd/repository/mapper';
import { User } from '@app/users/domain/model/user';
import { UserPreferenceEntity } from '@app/users/infrastructure/persistence/entities/user-preference.entity';
import { UserEntity } from '@app/users/infrastructure/persistence/entities/user.entity';
import { ValidationError } from '@app/value-objects/errors/validation/validation-error';
import { UserPreferences } from '@app/value-objects/model/user-preferences';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements Mapper<User, UserEntity> {
  toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id.value;
    entity.fullName = user.fullName;
    entity.username = user.username;
    entity.mobilePhone = user.mobilePhone;
    entity.passwordHash = user.passwordHash;
    entity.city = user.city;
    entity.countryCode = user.countryCode;
    entity.preferences = this.preferencesDomainToPersistence(user.id.value, user.userPreferences);

    return entity;
  }

  fromPersistence(entity: UserEntity): Either<ValidationError, User> {
    const userOrError = User.create(
      {
        fullName: entity.fullName,
        username: entity.username,
        mobilePhone: entity.mobilePhone,
        passwordHash: entity.passwordHash,
        city: entity.city,
        countryCode: entity.countryCode,
      },
      entity.id,
    );

    if (userOrError.isRight() && entity.preferences) {
      const user = userOrError.value;
      const preferencesOrError = UserPreferences.create({
        preferredSDGs: entity.preferences.preferredSDGs || [],
        preferredCategories: entity.preferences.preferredCategories || [],
        durationPreferences: entity.preferences.durationPreferences || [],
        notificationsEnabled: entity.preferences.notificationsEnabled ?? false,
      });

      if (preferencesOrError.isLeft()) {
        return left(preferencesOrError.value);
      }

      const updateResult = user.updateUserPreferences({
        preferredSDGs: preferencesOrError.value.preferredSDGs.slice(),
        preferredCategories: preferencesOrError.value.preferredCategories.slice(),
        durationPreferences: preferencesOrError.value.durationPreferences.slice(),
        notificationsEnabled: preferencesOrError.value.notificationsEnabled,
      });

      if (updateResult.isLeft()) {
        return left(updateResult.value);
      }
    }

    return userOrError;
  }

  private preferencesDomainToPersistence(userId: string, preferences: UserPreferences): UserPreferenceEntity {
    const entity = new UserPreferenceEntity();
    entity.userId = userId;
    entity.preferredSDGs = [...preferences.preferredSDGs];
    entity.preferredCategories = [...preferences.preferredCategories];
    entity.durationPreferences = [...preferences.durationPreferences];
    entity.notificationsEnabled = preferences.notificationsEnabled;
    return entity;
  }
}
